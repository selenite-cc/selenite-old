// http://lisperator.net/pltut/
// http://lisperator.net/s/lambda/lambda-eval4.js

function InputStream(input) {
    var pos = 0, line = 1, col = 0;
    return {
        next  : next,
        peek  : peek,
        eof   : eof,
        croak : croak,
    };
    function next() {
        var ch = input.charAt(pos++);
        if (ch == "\n") line++, col = 0; else col++;
        return ch;
    }
    function peek() {
        return input.charAt(pos);
    }
    function eof() {
        return peek() == "";
    }
    function croak(msg) {
        throw new Error(msg + " (" + line + ":" + col + ")");
    }
}

function TokenStream(input) {
    var current = null;
    var keywords = " let if then else lambda λ true false ";
    return {
        next  : next,
        peek  : peek,
        eof   : eof,
        croak : input.croak
    };
    function is_keyword(x) {
        return keywords.indexOf(" " + x + " ") >= 0;
    }
    function is_digit(ch) {
        return /[0-9]/i.test(ch);
    }
    function is_id_start(ch) {
        return /[a-zÎ»_]/i.test(ch);
    }
    function is_id(ch) {
        return is_id_start(ch) || "?!-<>=0123456789".indexOf(ch) >= 0;
    }
    function is_op_char(ch) {
        return "+-*/%=&|<>!".indexOf(ch) >= 0;
    }
    function is_punc(ch) {
        return ",;(){}[]".indexOf(ch) >= 0;
    }
    function is_whitespace(ch) {
        return " \t\n".indexOf(ch) >= 0;
    }
    function read_while(predicate) {
        var str = "";
        while (!input.eof() && predicate(input.peek()))
            str += input.next();
        return str;
    }
    function read_number() {
        var has_dot = false;
        var number = read_while(function(ch){
            if (ch == ".") {
                if (has_dot) return false;
                has_dot = true;
                return true;
            }
            return is_digit(ch);
        });
        return { type: "num", value: parseFloat(number) };
    }
    function read_ident() {
        var id = read_while(is_id);
        return {
            type  : is_keyword(id) ? "kw" : "var",
            value : id
        };
    }
    function read_escaped(end) {
        var escaped = false, str = "";
        input.next();
        while (!input.eof()) {
            var ch = input.next();
            if (escaped) {
                str += ch;
                escaped = false;
            } else if (ch == "\\") {
                escaped = true;
            } else if (ch == end) {
                break;
            } else {
                str += ch;
            }
        }
        return str;
    }
    function read_string() {
        return { type: "str", value: read_escaped('"') };
    }
    function skip_comment() {
        read_while(function(ch){ return ch != "\n" });
        input.next();
    }
    function read_next() {
        read_while(is_whitespace);
        if (input.eof()) return null;
        var ch = input.peek();
        if (ch == "#") {
            skip_comment();
            return read_next();
        }
        if (ch == '"') return read_string();
        if (is_digit(ch)) return read_number();
        if (is_id_start(ch)) return read_ident();
        if (is_punc(ch)) return {
            type  : "punc",
            value : input.next()
        };
        if (is_op_char(ch)) return {
            type  : "op",
            value : read_while(is_op_char)
        };
        input.croak("Can't handle character: " + ch);
    }
    function peek() {
        return current || (current = read_next());
    }
    function next() {
        var tok = current;
        current = null;
        return tok || read_next();
    }
    function eof() {
        return peek() == null;
    }
}

function parse(input) {
    var PRECEDENCE = {
        "=": 1,
        "||": 2,
        "&&": 3,
        "<": 7, ">": 7, "<=": 7, ">=": 7, "==": 7, "!=": 7,
        "+": 10, "-": 10,
        "*": 20, "/": 20, "%": 20,
    };
    var FALSE = { type: "bool", value: false };
    return parse_toplevel();
    function is_punc(ch) {
        var tok = input.peek();
        return tok && tok.type == "punc" && (!ch || tok.value == ch) && tok;
    }
    function is_kw(kw) {
        var tok = input.peek();
        return tok && tok.type == "kw" && (!kw || tok.value == kw) && tok;
    }
    function is_op(op) {
        var tok = input.peek();
        return tok && tok.type == "op" && (!op || tok.value == op) && tok;
    }
    function skip_punc(ch) {
        if (is_punc(ch)) input.next();
        else input.croak("Expecting punctuation: \"" + ch + "\"");
    }
    function skip_kw(kw) {
        if (is_kw(kw)) input.next();
        else input.croak("Expecting keyword: \"" + kw + "\"");
    }
    function skip_op(op) {
        if (is_op(op)) input.next();
        else input.croak("Expecting operator: \"" + op + "\"");
    }
    function unexpected() {
        input.croak("Unexpected token: " + JSON.stringify(input.peek()));
    }
    function maybe_binary(left, my_prec) {
        var tok = is_op();
        if (tok) {
            var his_prec = PRECEDENCE[tok.value];
            if (his_prec > my_prec) {
                input.next();
                return maybe_binary({
                    type     : tok.value == "=" ? "assign" : "binary",
                    operator : tok.value,
                    left     : left,
                    right    : maybe_binary(parse_atom(), his_prec)
                }, my_prec);
            }
        }
        return left;
    }
    function delimited(start, stop, separator, parser) {
        var a = [], first = true;
        skip_punc(start);
        while (!input.eof()) {
            if (is_punc(stop)) break;
            if (first) first = false; else skip_punc(separator);
            if (is_punc(stop)) break;
            a.push(parser());
        }
        skip_punc(stop);
        return a;
    }
    function parse_call(func) {
        return {
            type: "call",
            func: func,
            args: delimited("(", ")", ",", parse_expression),
        };
    }
    function parse_varname() {
        var name = input.next();
        if (name.type != "var") input.croak("Expecting variable name");
        return name.value;
    }
    function parse_vardef() {
        var name = parse_varname(), def;
        if (is_op("=")) {
            input.next();
            def = parse_expression();
        }
        return { name: name, def: def };
    }
    function parse_let() {
        skip_kw("let");
        if (input.peek().type == "var") {
            var name = input.next().value;
            var defs = delimited("(", ")", ",", parse_vardef);
            return {
                type: "call",
                func: {
                    type: "lambda",
                    name: name,
                    vars: defs.map(function(def){ return def.name }),
                    body: parse_expression(),
                },
                args: defs.map(function(def){ return def.def || FALSE })
            };
        }
        return {
            type: "let",
            vars: delimited("(", ")", ",", parse_vardef),
            body: parse_expression(),
        };
    }
    function parse_if() {
        skip_kw("if");
        var cond = parse_expression();
        if (!is_punc("{")) skip_kw("then");
        var then = parse_expression();
        var ret = {
            type: "if",
            cond: cond,
            then: then,
        };
        if (is_kw("else")) {
            input.next();
            ret.else = parse_expression();
        }
        return ret;
    }
    function parse_lambda() {
        return {
            type: "lambda",
            name: input.peek().type == "var" ? input.next().value : null,
            vars: delimited("(", ")", ",", parse_varname),
            body: parse_expression()
        };
    }
    function parse_bool() {
        return {
            type  : "bool",
            value : input.next().value == "true"
        };
    }
    function maybe_call(expr) {
        expr = expr();
        return is_punc("(") ? parse_call(expr) : expr;
    }
    function parse_atom() {
        return maybe_call(function(){
            if (is_punc("(")) {
                input.next();
                var exp = parse_expression();
                skip_punc(")");
                return exp;
            }
            if (is_punc("{")) return parse_prog();
            if (is_kw("let")) return parse_let();
            if (is_kw("if")) return parse_if();
            if (is_kw("true") || is_kw("false")) return parse_bool();
            if (is_kw("lambda") || is_kw("Î»")) {
                input.next();
                return parse_lambda();
            }
            var tok = input.next();
            if (tok.type == "var" || tok.type == "num" || tok.type == "str")
                return tok;
            unexpected();
        });
    }
    function parse_toplevel() {
        var prog = [];
        while (!input.eof()) {
            prog.push(parse_expression());
            if (!input.eof()) skip_punc(";");
        }
        return { type: "prog", prog: prog };
    }
    function parse_prog() {
        var prog = delimited("{", "}", ";", parse_expression);
        if (prog.length == 0) return FALSE;
        if (prog.length == 1) return prog[0];
        return { type: "prog", prog: prog };
    }
    function parse_expression() {
        return maybe_call(function(){
            return maybe_binary(parse_atom(), 0);
        });
    }
}

function Environment(parent) {
    this.vars = Object.create(parent ? parent.vars : null);
    this.parent = parent;
}
Environment.prototype = {
    extend: function() {
        return new Environment(this);
    },
    lookup: function(name) {
        var scope = this;
        while (scope) {
            if (Object.prototype.hasOwnProperty.call(scope.vars, name))
                return scope;
            scope = scope.parent;
        }
    },
    get: function(name) {
        if (name in this.vars)
            return this.vars[name];
        throw new Error("Undefined variable " + name);
    },
    set: function(name, value) {
        var scope = this.lookup(name);
        if (!scope && this.parent)
            throw new Error("Undefined variable " + name);
        return (scope || this).vars[name] = value;
    },
    def: function(name, value) {
        return this.vars[name] = value;
    }
};

function evaluate(exp, env, callback) {
    GUARD(evaluate, arguments);
    switch (exp.type) {
      case "num":
      case "str":
      case "bool":
        callback(exp.value);
        return;

      case "var":
        callback(env.get(exp.value));
        return;

      case "assign":
        if (exp.left.type != "var")
            throw new Error("Cannot assign to " + JSON.stringify(exp.left));
        evaluate(exp.right, env, function CC(right){
            GUARD(CC, arguments);
            callback(env.set(exp.left.value, right));
        });
        return;

      case "binary":
        evaluate(exp.left, env, function CC(left){
            GUARD(CC, arguments);
            evaluate(exp.right, env, function CC(right){
                GUARD(CC, arguments);
                callback(apply_op(exp.operator, left, right));
            });
        });
        return;

      case "let":
        (function loop(env, i){
            GUARD(loop, arguments);
            if (i < exp.vars.length) {
                var v = exp.vars[i];
                if (v.def) evaluate(v.def, env, function CC(value){
                    GUARD(CC, arguments);
                    var scope = env.extend();
                    scope.def(v.name, value);
                    loop(scope, i + 1);
                }); else {
                    var scope = env.extend();
                    scope.def(v.name, false);
                    loop(scope, i + 1);
                }
            } else {
                evaluate(exp.body, env, callback);
            }
        })(env, 0);
        return;

      case "lambda":
        callback(make_lambda(env, exp));
        return;

      case "if":
        evaluate(exp.cond, env, function CC(cond){
            GUARD(CC, arguments);
            if (cond !== false) evaluate(exp.then, env, callback);
            else if (exp.else) evaluate(exp.else, env, callback);
            else callback(false);
        });
        return;

      case "prog":
        (function loop(last, i){
            GUARD(loop, arguments);
            if (i < exp.prog.length) evaluate(exp.prog[i], env, function CC(val){
                GUARD(CC, arguments);
                loop(val, i + 1);
            }); else {
                callback(last);
            }
        })(false, 0);
        return;

      case "call":
        evaluate(exp.func, env, function CC(func){
            GUARD(CC, arguments);
            (function loop(args, i){
                GUARD(loop, arguments);
                if (i < exp.args.length) evaluate(exp.args[i], env, function CC(arg){
                    GUARD(CC, arguments);
                    args[i + 1] = arg;
                    loop(args, i + 1);
                }); else {
                    func.apply(null, args);
                }
            })([ callback ], 0);
        });
        return;

      default:
        throw new Error("I don't know how to evaluate " + exp.type);
    }
}

function make_lambda(env, exp) {
    if (exp.name) {
        env = env.extend();
        env.def(exp.name, lambda);
    }
    function lambda(callback) {
        GUARD(lambda, arguments);
        var names = exp.vars;
        var scope = env.extend();
        for (var i = 0; i < names.length; ++i)
            scope.def(names[i], i + 1 < arguments.length ? arguments[i + 1] : false);
        evaluate(exp.body, scope, callback);
    }
    return lambda;
}

function apply_op(op, a, b) {
    function num(x) {
        if (typeof x != "number")
            throw new Error("Expected number but got " + x);
        return x;
    }
    function div(x) {
        if (num(x) == 0)
            throw new Error("Divide by zero");
        return x;
    }
    switch (op) {
      case "+": return num(a) + num(b);
      case "-": return num(a) - num(b);
      case "*": return num(a) * num(b);
      case "/": return num(a) / div(b);
      case "%": return num(a) % div(b);
      case "&&": return a !== false && b;
      case "||": return a !== false ? a : b;
      case "<": return num(a) < num(b);
      case ">": return num(a) > num(b);
      case "<=": return num(a) <= num(b);
      case ">=": return num(a) >= num(b);
      case "==": return a === b;
      case "!=": return a !== b;
    }
    throw new Error("Can't apply operator " + op);
}

var STACKLEN;
function GUARD(f, args) {
    if (STACKLEN - 1 < 0) throw new Continuation(f, args);
}
function Continuation(f, args) {
    this.f = f;
    this.args = args;
}
function Execute(f, args) {
    while (true) try {
        STACKLEN = 200;
        return f.apply(null, args);
    } catch(ex) {
        if (ex instanceof Continuation)
            f = ex.f, args = ex.args;
        else throw ex;
    }
}

function createEnv(path) {
  var env = new Environment();
  env.scriptPath = path;
  
  env.def("CallCC", function CallCC(k, func) {
    GUARD(CallCC, arguments);
    func(k, function CC(discarded, ret){
      GUARD(CC, arguments);
      k(ret);
    });
  });

  env.def("time", function(k, func) {
    console.time("time");
    func(function(ret){
      console.timeEnd("time");
      k(ret);
    });
  });
  
  env.def("alert", function alert(k, val) {
    function callback() {
      k(false);
    }
    xp.alert(val, callback, callback);
  });
  
  env.def("prompt", function prompt(k, val) {
    function callback(res) {
      k('' + (res || ''));
    }
    xp.prompt('Alert', val, callback, arguments.length > 2 ? arguments[2] : '', callback);
  });
  
  env.def("ConcatStr", function(k, nope) {
    let res = '';
    for (let i = 1; i < arguments.length; i ++) {
      res += arguments[i];
    }
    k(res);
  });
  
  env.def("ParseInt", function(k, notanint) {
    k(parseInt(notanint));
  });
  
  env.def("Array", function(k, nope) {
    let res = [];
    for (let i = 1; i < arguments.length; i ++) {
      res.push(arguments[i]);
    }
    k(res);
  });
  
  env.def("ArrayGet", function(k, nope) {
    k(arguments[1][arguments[2]]);
  });
  
  env.def("ArraySet", function(k, nope) {
    arguments[1][arguments[2]] = arguments[3];
    k(arguments[3]);
  });
  
  env.def("ArrayIndexOf", function arrayIndexOf(k, nope) {
    GUARD(arrayIndexOf, arguments);
    k(arguments[1].indexOf(arguments[2]));
  });
  
  env.def("SplitStr", function(k, nope) {
    k(arguments[1].split(arguments[2]));
  });
  
  env.def("ToLowerCase", function(k, str) {
    k(('' + str).toLowerCase());
  });
  
  env.def("ToUpperCase", function(k, str) {
    k(('' + str).toUpperCase());
  });
  
  env.def("execScript", function(k, filename) {
    execLDFile(xp.filesystem.addPaths(env.scriptPath, filename), env.scriptPath);
    k(false);
  });
  
  return env;
}

function execLD(code, path) {
  try {
    var ast = parse(TokenStream(InputStream(code)));
    var env = createEnv(path);
    Execute(evaluate, [ast, env, function(result){
      console.log("*** Result:", result);
    }]);
  } catch(e) {
    xp.error(e);
  }
}

function execLDFile(path, dir) {
  xp.filesystem.readFile(path, (text) => {
    execLD(text, dir);
  });
}

$(window).on('xpboot', () => {
  explorer.fileHandlers.add('lda', (file) => {
    execLDFile(file, file.substring(0, file.lastIndexOf("/")));
  });
  xp.applications.add('lda', (args) => {
    if (args.length < 2) {
      xp.alert('Usage: lda <filename>');
    } else {
      execLDFile(xp.filesystem.addPaths(args[0], args[1]), args[0]);
    }
  });
});
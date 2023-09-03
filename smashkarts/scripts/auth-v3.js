'use strict';

var unityFirebaseGameOjbectName = 'JavascriptMessageReceiver';
 
var firstLoad = true;

function onAuthStateChanged(user) {
  if(!user)
  {
    if(firstLoad)
    {
      signInAnonymously();
    }
  }
  else
  {
    sendAuthDataToUnity();
  }
  firstLoad = false;
}


function signInAnonymously()
{
  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    console.log("error logging in " + errorCode);
    console.error(error);
  });
}

function signInWithEmail(email, password)
{
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("signInWithEmailAndPassword Success");
    }) 
    .catch(function(error) 
    {
      console.log("error logging in " + error.code);
      console.error(error);
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
  });
}

function linkUserWithEmail(email, password)
{  
  if(firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous)
  {
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
      console.log("Anonymous account successfully upgraded", user);
      sendAuthDataToUnity();
    }, function(error) {
      console.log("Error upgrading anonymous account", error);
      console.error(error);
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", error.message);
    });
  }
}

function linkOrSignInWithGoogle()
{
  var provider = new firebase.auth.GoogleAuthProvider();

  if(firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous)
  {
    if(isMobile())
    {
      firebase.auth().linkWithRedirect(provider);

      firebase.auth().getRedirectResult().then(function(result) 
      {
        console.log("linkOrSignInWithGoogle:success");
        sendAuthDataToUnity();
      }, function(error) 
      {
        if(error.code == "auth/credential-already-in-use")
        {
          firebase.auth().signInWithCredential(error.credential).catch(function(error) 
          {
            console.log("signInWithCredential:: Error logging in " + error.code);
            console.error(error);
            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
           });
        }
        else
        {
          console.log("linkOrSignInWithGoogle:: Error logging in " + error.code);
          console.error(error);
          window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", error.message);
        }
      });
    }
    else
    {
      firebase.auth().currentUser.linkWithPopup(provider).then((result) => 
      {
        console.log("linkOrSignInWithGoogle:: Success");
        sendAuthDataToUnity();
      }).catch((error) => 
      {
        if(error.code == "auth/credential-already-in-use")
        {
          firebase.auth().signInWithCredential(error.credential).catch(function(error) 
          {
            console.log("signInWithCredential:: Error logging in " + error.code);
            console.error(error);
            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
           });
        }
        else
        {
          console.log("linkOrSignInWithGoogle:: Error logging in " + error.code);
          console.error(error);
          window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", error.message);
        }
      });
    }
  }
}

function linkOrSignInWithApple()
{
  var provider = new firebase.auth.OAuthProvider('apple.com');
 
  if(firebase.auth().currentUser != null && firebase.auth().currentUser.isAnonymous)
  {
    var isSafariBrowser = (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1);
    if(isMobile() || isSafariBrowser)
    {
      firebase.auth().currentUser.linkWithRedirect(provider);
    }
    else
    {
      firebase.auth().currentUser.linkWithPopup(provider).then((result) => 
      {
        console.log("linkOrSignInWithApple:: Success");
        sendAuthDataToUnity();
      }).catch((error) => 
      {
        if(error.code == "auth/credential-already-in-use")
        {
          firebase.auth().signInWithCredential(error.credential).catch(function(error) 
          {
            console.log("signInWithCredential:: Error logging in " + error.code);
            console.error(error);
            window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseSignInWithEmailFailed", error.message);
           });
        }
        else
        {
          console.log("linkOrSignInWithApple:: Error logging in " + error.code);
          console.error(error);
          window.unityGame.SendMessage(unityFirebaseGameOjbectName, "firebaseLinkUserWithEmailFailed", error.message);
        }
      });
    }
  }
}

function signOut()
{
  firebase.auth().signOut().then(function() {
    console.log("signOut:: Success");
    signInAnonymously();
  }).catch(function(error) {
    console.log("signOut:: Failed ");
    console.error(error);
  });
}

function sendAuthDataToUnity()
{
    if(window.unityGame != null && firebase.auth().currentUser != null)
    {     
      var firebaseUid = firebase.auth().currentUser.uid;
      var isAnon = firebase.auth().currentUser.isAnonymous;
      var data = {authToken:"",uid:firebaseUid,isAnonymous:isAnon};
      var dataJson = JSON.stringify(data);
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, 'SetAuthToken', dataJson);
    }
}

function sendPasswordResetEmail(emailAddress)
{
  firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
    console.log("sendPasswordResetEmail:: Success");
    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "SendPasswordResetEmailSuccess");
  }).catch(function(error) {
    console.log("sendPasswordResetEmail:: Failed ");
    window.unityGame.SendMessage(unityFirebaseGameOjbectName, "SendPasswordResetEmailFailed", error.message);
    console.error(error);
  });
}

function getValueTT(nodeKey) 
{
  if(firebase.auth().currentUser != null)
  {
    const dbRef = firebase.database().ref();
    dbRef.child(nodeKey).once('value').then((snapshot) => {
      if (snapshot.exists()) 
      {
        var valJsonStr = JSON.stringify(snapshot.val());
        SendDataToUnity("OnGetValueSuccess", nodeKey, valJsonStr);
      } 
      else 
      {
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnGetValueEmptySuccess", nodeKey);
      }
    }).catch((error) => 
    {
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnGetValueError", nodeKey, error.message);
      console.error(error);
    });
  }
}

function SendDataToUnity(functionName, nk, ds)
{
  var obj = 
  {
    nodeKey: nk,
    dataStr: ds
  }

  window.unityGame.SendMessage(unityFirebaseGameOjbectName, functionName, JSON.stringify(obj));
}


function SendResponseToUnity(functionName, k, resonseData)
{
  resonseData["key"] = k;

  window.unityGame.SendMessage(unityFirebaseGameOjbectName, functionName, JSON.stringify(resonseData));
}

function setValueTT(nodeKey, jsonData) 
{
  if(firebase.auth().currentUser != null)
  {
    const dbRef = firebase.database().ref();
    var jsonObj = JSON.parse(jsonData);
    dbRef.child(nodeKey).set(jsonObj, (error) => {
      if (error) {
        console.log("auth.js::setValue - Error " + nodeKey);
        SendDataToUnity("OnSetValueError", nodeKey, error.message);
      } else {
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnSetValueSuccess", nodeKey);
      }
    });
  }
}

function removeValueTT(nodeKey)
{
  if(firebase.auth().currentUser != null)
  {
    const dbRef = firebase.database().ref();
    dbRef.child(nodeKey).remove()
    .then(function(){
      window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnRemoveValueSuccess", nodeKey);
    })
    .catch(function(error){
      console.log("auth.js::removeValueTT error");
      SendDataToUnity("OnRemoveValueError", nodeKey, error.message);
    });
  }
}

function updateValueTT(nodeKey, jsonData)
{
  if(firebase.auth().currentUser != null)
  {
    const dbRef = firebase.database().ref();
    var jsonObj = JSON.parse(jsonData);
    dbRef.child(nodeKey).update(jsonObj, (error) => {
      if (error) {
        console.log("auth.js::updateValue Error " + nodeKey);
        SendDataToUnity( "OnUpdateValueError", nodeKey, error.message);
      } else {
        window.unityGame.SendMessage(unityFirebaseGameOjbectName, "OnUpdateValueSuccess", nodeKey);
      }
    });
  }
}

var cloudFunctionSuccess = 0;
var cloudFunctionFail = 0;

function callCloudFunction(functionId, jsonData, key)
{
  if(firebase.auth().currentUser != null)
  {
    try
    {  
      const dataObject = JSON.parse(jsonData);
      var functionRef = firebase.app().functions("us-east1").httpsCallable(functionId + "Multi");

      functionRef(dataObject).then((response)=> 
      {
        SendResponseToUnity( "OnFunctionComplete", key, response.data);
        cloudFunctionSuccess++;
      }).catch((error4)=> {
          cloudFunctionFail++;
            //SendDataToUnity( "OnFunctionError", key, error4.message);
            callCloudFunctionOG(functionId, jsonData, key);
            logCloudFunctionError("v4a", jsonData, error4.message, functionId);
        });
    } catch (error1) 
    {
      cloudFunctionFail++;
      //SendDataToUnity( "OnFunctionError", key, error1.message);
      callCloudFunctionOG(functionId, jsonData, key);
      logCloudFunctionError("v4b", jsonData, error1.message, functionId);
    } 
  }
}

function callCloudFunctionOG(functionId, jsonData, key)
{
  if(firebase.auth().currentUser != null)
  {
    try
    {      
      const dataObject = JSON.parse(jsonData);
      var functionRef = firebase.app().functions().httpsCallable(functionId);

      functionRef(dataObject).then((response)=> 
      {
        SendResponseToUnity( "OnFunctionComplete", key, response.data);
        logCloudFunctionSuccess("v4s1", jsonData, functionId);
        cloudFunctionSuccess++;
      }).catch((error4)=> {
          cloudFunctionFail++;
            //SendDataToUnity( "OnFunctionError", key, error4.message);
            callCloudFunctionAlt(functionId, jsonData, key);
            logCloudFunctionError("v4c", jsonData, error4.message, functionId);
        });
    } catch (error1) 
    {
      cloudFunctionFail++;
      //SendDataToUnity( "OnFunctionError", key, error1.message);
      callCloudFunctionAlt(functionId, jsonData, key);
      logCloudFunctionError("v4d", jsonData, error1.message, functionId);
    } 
  }
}

function callCloudFunctionAlt(functionId, jsonData, key)
{
  if(firebase.auth().currentUser != null)
  {
    try
    {      
      const dataObject = JSON.parse(jsonData);
      //var functionRef = firebase.app().functions().httpsCallable(functionId);
      var functionRef = firebase.app().functions("europe-west1").httpsCallable(functionId + "Multi");

      functionRef(dataObject).then((response)=> 
      {
        SendResponseToUnity( "OnFunctionComplete", key, response.data);
        logCloudFunctionSuccess("v4s2", jsonData, functionId);
        cloudFunctionSuccess++;
      }).catch((error4)=> {
          cloudFunctionFail++;
          callCloudFunctionRewrite(functionId, jsonData, key);
          logCloudFunctionError("v4e", jsonData, error4.message, functionId);
        });
    } catch (error1) 
    {
      cloudFunctionFail++;
      callCloudFunctionRewrite(functionId, jsonData, key);
      logCloudFunctionError("v4f", jsonData, error1.message, functionId);
    } 
  }
}

function callCloudFunctionRewrite(functionId, jsonData, key)
{
  if(firebase.auth().currentUser != null)
  {
    try
    {
      const dataObject = JSON.parse(jsonData);
      dataObject["funcName"] = functionId;
      
      firebase.auth().currentUser.getIdToken(false).then((authToken) =>
      {
        fetch("https://smashkarts.io/rewriteCF", {
          method: 'POST', 
          cache: 'no-cache',          
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataObject)
        }).then((fetchResponse) =>
        {
          //Need to parse fetch response into usable json data
          fetchResponse.json().then((responseJsonData) =>
          {
            SendResponseToUnity( "OnFunctionComplete", key, responseJsonData);
            logCloudFunctionSuccess("v4s3", jsonData, functionId);
            cloudFunctionSuccess++;
          }).catch((error4) =>
          {
            cloudFunctionFail++;
            SendDataToUnity( "OnFunctionError", key, error4.message);
            logCloudFunctionError("v4g", jsonData, error4.message, functionId);          
          });
        }).catch((error3) =>
        {
          cloudFunctionFail++;
          SendDataToUnity( "OnFunctionError", key, error3.message);
          logCloudFunctionError("v4h", jsonData, error3.message, functionId);          
        });              
      }).catch((error2)=> {
        cloudFunctionFail++;
        SendDataToUnity( "OnFunctionError", key, error2.message);
        logCloudFunctionError("v4i", jsonData, error2.message, functionId);          
      });               
    }
    catch(error1)
    {
      cloudFunctionFail++;
      SendDataToUnity( "OnFunctionError", key, error1.message);
      logCloudFunctionError("v4j", jsonData, error1.message, functionId);          
    }
  }
}

function logCloudFunctionError(debugErrorRootNode, jsonData, message, functionId)
{
  var firebaseUid = firebase.auth().currentUser.uid;
  var currentTime = new Date().getTime();
  var debugErrorNode = "cferror/" + debugErrorRootNode + "/" + firebaseUid + "/" + functionId + "/" + currentTime;
  const dbRef = firebase.database().ref();
  dbRef.child(debugErrorNode).set({
    errorData: jsonData,
    os: getOS(),
    time: currentTime,
    successCount: cloudFunctionSuccess,
    failCound: cloudFunctionFail,
    errorMessage: message
  }, (setValueError) =>
  {
    if (setValueError)
    {
      console.log("logCloudFunctionError setValueError:: " + setValueError.message);
    } else
    {
      var debugErrorWriteSuccessNode = "cferror/" + debugErrorRootNode + "/" + firebaseUid + "/" + functionId + "/" + currentTime + "/successTime";
      var successTime = new Date().getTime();
      dbRef.child(debugErrorWriteSuccessNode).set(successTime);
      console.log("logCloudFunctionError Successfdfd ");
    }
  });
}

function logCloudFunctionSuccess(debugErrorRootNode, jsonData, functionId)
{
  var firebaseUid = firebase.auth().currentUser.uid;
  var currentTime = new Date().getTime();
  var debugErrorNode = "cferror/" + debugErrorRootNode + "/" + firebaseUid + "/" + functionId + "/" + currentTime;
  const dbRef = firebase.database().ref();
   
  dbRef.child(debugErrorNode).set({
    errorData: jsonData,
    os: getOS(),
    time : currentTime,
    successCount : cloudFunctionSuccess,
    failCount : cloudFunctionFail,
  }, (setValueError) => {
    if (setValueError) {
        console.log("logCloudFunctionSuccess setValueError:: " + setValueError.message);
        
      } else {
        console.log("logCloudFunctionSuccess Success ");
      }
    }
  );
}

function getCurrentUserId()
{
  if(firebase.auth().currentUser != null)
  {
    return firebase.auth().currentUser.uid;
  }
  return "";    
}

function getCurrentUserIsAnon()
{
  if(firebase.auth().currentUser != null)
  {
    return firebase.auth().currentUser.isAnonymous;
  }
  return true;   
}

window.addEventListener('load', function() {
  console.log('Init Auth');
  if (typeof firebase !== 'undefined' && firebase.auth() != null) 
  {
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }
}, false);



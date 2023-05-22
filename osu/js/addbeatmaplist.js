function starname(star) {
    if (typeof(star) == "null") return "unknown";
    if (typeof(star) == "undefined") return "unknown";
    if (star<2) return "easy";
    if (star<2.7) return "normal";
    if (star<4) return "hard";
    if (star<5.3) return "insane";
    if (star<6.5) return "expert";
    return "expert-plus";
}

// star: number; numerical representation of star rating
// returns an html element used in difficulty selection menu
function createStarRow(star) {
    let row = document.createElement("div");
    row.className = "star-row";
    for (let i=0; i<10; ++i) {
        let container = document.createElement("div");
        container.className = "imgcontainer";
        let img = document.createElement("img");
        container.appendChild(img);
        row.appendChild(container);
        img.src = "img/star.png";
        let value = Math.min(Math.max(star-i,0),1);
        let size = 8 + value*10;
        let pad = (1-value) * 5;
        let style = "width:" + size + "px;";
        style += "bottom:" + pad + "px;";
        style += "left:" + pad + "px;";
        if (value == 0) {
            style += "opacity:0.4;";
        }
        img.setAttribute("style", style);
    }
    return row;
}
// creates a difficulty selection menu
function createDifficultyList(boxclicked, event) {
    // check if a list of this kind is already there
    if (window.currentDifficultyList) {
        window.removeEventListener("click", window.currentDifficultyList.clicklistener);
        window.currentDifficultyList.parentElement.removeChild(window.currentDifficultyList);
        window.currentDifficultyList = null;
    }
    // window.showingDifficultyList = true;
    event.stopPropagation();
    // calculate list position on page
    let rect = boxclicked.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top; 
    // create list
    let difficultyBox = document.createElement("div");
    window.currentDifficultyList = difficultyBox;
    difficultyBox.className = "difficulty-box";
    difficultyBox.style.left = x + "px";
    difficultyBox.style.top = y + "px";
    boxclicked.appendChild(difficultyBox);
    // close list if clicked outside
    var closeDifficultyList = function() {
        boxclicked.removeChild(difficultyBox);
        window.currentDifficultyList = null;
        window.removeEventListener('click', closeDifficultyList, false);
    };
    window.addEventListener("click", closeDifficultyList, false);
    difficultyBox.clicklistener = closeDifficultyList;
    // fill list
    for (let i=0; i<boxclicked.data.ChildrenBeatmaps.length; ++i) {
        // add a row
        let difficultyItem = document.createElement("div");
        difficultyItem.className = "difficulty-item";
        difficultyBox.appendChild(difficultyItem);
        difficultyItem.data = boxclicked.data.ChildrenBeatmaps[i];
        // add ring icon representing star
        let ringbase = document.createElement("div");
        let ring = document.createElement("div");
        ringbase.className = "bigringbase";
        ring.className = "bigring";
        ring.classList.add(starname(boxclicked.data.ChildrenBeatmaps[i].DifficultyRating));
        difficultyItem.appendChild(ringbase);
        difficultyItem.appendChild(ring);
        // add version name & mapper
        let line = document.createElement("div");
        let version = document.createElement("div");
        let mapper = document.createElement("div");
        line.className = "versionline";
        version.className = "version";
        mapper.className = "mapper";
        line.appendChild(version);
        line.appendChild(mapper);
        difficultyItem.appendChild(line);
        version.innerText = boxclicked.data.ChildrenBeatmaps[i].DiffName;
        mapper.innerText = "mapped by " + boxclicked.data.Creator;
        // add row of stars
        difficultyItem.appendChild(createStarRow(boxclicked.data.ChildrenBeatmaps[i].DifficultyRating));
        // add callbacks
        difficultyItem.onhover = function() {

        }
        difficultyItem.onclick = function(e) {
            // check if ready
            if (!window.scriptReady || !window.soundReady || !window.skinReady || !this.parentElement.parentElement.oszblob) {
                return;
            }
            launchGame(this.parentElement.parentElement.oszblob, this.data.BeatmapID, this.data.DiffName);
        }
    }
    difficultyBox.onclick = function(e) {
        e.stopPropagation();
    }
}


var NSaddBeatmapList = {

        addlikeicon: function(box) {
        let icon = document.createElement("div");
        icon.className = "beatmaplike";
        icon.setAttribute("hidden","");
        box.appendChild(icon);
        box.initlike = function() {
            if (!window.liked_sid_set || !box.sid) {
                return;
            }
            if (window.liked_sid_set.has(box.sid)) {
                icon.classList.add("icon-heart");
                icon.onclick = box.undolike;
            }
            else {
                icon.classList.add("icon-heart-empty");
                icon.onclick = box.like;
            }
            icon.removeAttribute("hidden");
        }        
        box.like = function(e) {
            e.stopPropagation();
            window.liked_sid_set.add(box.sid);
            localforage.setItem("likedsidset", window.liked_sid_set, function(err, val){
                if (err) {
                    console.error("Error saving liked beatmap list");
                }
                else {
                    icon.classList.add("hint-liked");
                }
            });
            icon.onclick = box.undolike;
            icon.classList.remove("icon-heart-empty");
            icon.classList.add("icon-heart");
        }
        box.undolike = function(e) {
            e.stopPropagation();
            window.liked_sid_set.delete(box.sid);
            localforage.setItem("likedsidset", window.liked_sid_set, function(err, val){
                if (err) {
                    console.error("Error saving liked beatmap list");
                }
            });
            icon.onclick = box.like;
            icon.classList.remove("icon-heart");
            icon.classList.add("icon-heart-empty");
            icon.classList.remove("hint-liked");
        }
        if (window.liked_sid_set) {
            box.initlike();
        }
        else {
            if (!window.liked_sid_set_callbacks)
                window.liked_sid_set_callbacks = [];
            window.liked_sid_set_callbacks.push(box.initlike);
        }
    },

    // map contains key: sid, title, artist, creator
    addpreviewbox: function(map, list) {
        function approvedText(status) {
            if (status == 4) return "LOVED";
            if (status == 3) return "QUALIFIED";
            if (status == 2) return "APPROVED";
            if (status == 1) return "RANKED";
            if (status == 0) return "PENDING";
            if (status == -1) return "WIP";
            if (status == -2) return "GRAVEYARD";
            return "UNKNOWN";
        }
        // create container of beatmap on web page
        let pBeatmapBox = document.createElement("div");
        pBeatmapBox.setdata = map;
        pBeatmapBox.sid = map.ParentSetID;
        let pBeatmapCover = document.createElement("img");
        let pBeatmapCoverOverlay = document.createElement("div");
        let pBeatmapTitle = document.createElement("div");
        let pBeatmapArtist = document.createElement("div");
        let pBeatmapCreator = document.createElement("div");
        let pBeatmapApproved = document.createElement("div");
        let pBeatmapSid = document.createElement("div");
        pBeatmapBox.className = "beatmapbox";
        pBeatmapCover.className = "beatmapcover";
        pBeatmapCoverOverlay.className = "beatmapcover-overlay";
        pBeatmapTitle.className = "beatmaptitle";
        pBeatmapArtist.className = "beatmapartist";
        pBeatmapCreator.className = "beatmapcreator";
        pBeatmapApproved.className = "beatmapapproved";
        pBeatmapSid.className = "beatmapsid";
        pBeatmapBox.appendChild(pBeatmapCover);
        pBeatmapBox.appendChild(pBeatmapCoverOverlay);
        pBeatmapBox.appendChild(pBeatmapTitle);
        pBeatmapBox.appendChild(pBeatmapArtist);
        pBeatmapBox.appendChild(pBeatmapCreator);
        pBeatmapBox.appendChild(pBeatmapApproved);
        pBeatmapBox.appendChild(pBeatmapSid);
        NSaddBeatmapList.addlikeicon(pBeatmapBox);
        // set beatmap title & artist display (prefer ascii title)
        pBeatmapTitle.innerText = map.Title;
        pBeatmapArtist.innerText = map.Artist;
        pBeatmapCreator.innerText = "Mapper: " + map.Creator;
        pBeatmapSid.innerText = map.SetID;
        pBeatmapCover.alt = "cover" + map.SetID;
        pBeatmapCover.src = "https://assets.ppy.sh/beatmaps/" + map.SetID + "/covers/cover.jpg";
        list.appendChild(pBeatmapBox);
        pBeatmapApproved.innerText = approvedText(map.RankedStatus);
        return pBeatmapBox;
    },

    addStarRings: function(box, data) {
        // get star ratings
        let stars = [];
        for (let i=0; i<data.length; ++i) {
            stars.push(data[i].DifficultyRating);
        }
        let row = document.createElement("div");
        row.className = "beatmap-difficulties";
        box.appendChild(row);
        // show all of them if can be fit in
        if (stars.length <= 13) {
            for (let i=0; i<stars.length; ++i) {
                let difficultyRing = document.createElement("div");
                difficultyRing.className = "difficulty-ring";
                let s = starname(stars[i]);
                if (s.length>0)
                    difficultyRing.classList.add(s);
                row.appendChild(difficultyRing);
            }
        }
        // show only highest star and count otherwise
        else {
            let difficultyRing = document.createElement("div");
            difficultyRing.className = "difficulty-ring";
            let s = starname(stars[stars.length-1]);
            if (s.length>0)
                difficultyRing.classList.add(s);
            row.appendChild(difficultyRing);
            let cnt = document.createElement("span");
            cnt.className = "difficulty-count";
            cnt.innerText = stars.length;
            row.appendChild(cnt);
        }
        if (data.length == 0) {
            let cnt = document.createElement("span");
            cnt.className = "difficulty-count";
            cnt.innerText = "no std map";
            row.appendChild(cnt);
        }
    },

    addLength: function(box, data) {
        // show length & bpm
        let length = 0;
        let bpm = 0;
        for (let i=0; i<data.length; ++i) {
            length = Math.max(length, data[i].TotalLength);
            bpm = Math.max(bpm, data[i].BPM);
        }
        // let pBeatmapBPM = document.createElement("div");
        // pBeatmapBPM.className = "beatmapbpm";
        // box.appendChild(pBeatmapBPM);
        // pBeatmapBPM.innerText = Math.round(bpm) + "♪";
        let pBeatmapLength = document.createElement("div");
        pBeatmapLength.className = "beatmaplength";
        box.appendChild(pBeatmapLength);
        pBeatmapLength.innerText = Math.floor(length/60) + ":" + (length%60<10?"0":"") + (length%60);
    },
    
    addMoreInfo: async function(box, data) {
        // remove all but osu std mode
        data.ChildrenBeatmaps = data.ChildrenBeatmaps.filter(function(o){return o.Mode == 0;});
        data.ChildrenBeatmaps = data.ChildrenBeatmaps.sort(function(a,b){return Math.sign(a.DifficultyRating-b.DifficultyRating);});
        box.data = data;
        NSaddBeatmapList.addStarRings(box, data.ChildrenBeatmaps);
        NSaddBeatmapList.addLength(box, data.ChildrenBeatmaps);
    }
}

// async
// adds symbols of these beatmap packs to webpage
// listurl: url of api request that returns a list of beatmap packs
// list: DOM element to insert beatmaps into
// filter, maxsize: does't apply if not specified
// Note that some beatmaps may not contain std mode, so we request more maps than we need
async function addBeatmapList(listurl, list) {
    if (!list) list = document.getElementById("beatmap-list");
    const request = await fetch(listurl);
    // request beatmap pack list
        const data = await request.json()

        if (typeof(data.endid) != "undefined"){
            window.list_endid = data.endid;
        } else {
            window.list_endid = 0;
        }
        let box = [];

        // add widget to webpage as soon as list is fetched
        for (let i=0; i < data.length; i++) {
            box.push(NSaddBeatmapList.addpreviewbox(data[i], list));
        }
        // async add more info
        for (let i=0; i < data.length; i++) {
            box[i].sid = data[i].SetID;

            NSaddBeatmapList.addMoreInfo(box[i], data[i]);
            box[i].onclick = function(e) {
                // this is effective only when box.data is available
                createDifficultyList(box[i], e);
                startdownload(box[i]);
            }
        }
        if (window.beatmaplistLoadedCallback) {
            window.beatmaplistLoadedCallback();
            window.beatmaplistLoadedCallback = null;
            // to make sure it's called only once
        }
    }
    async function addBeatmapSid(sid, list) {
        if (!list) list = document.getElementById("beatmap-list");

        const request = await fetch(`https://catboy.best/api/s/${sid}`)

        const data = await request.json()

        if(request.error) return alert("Beatmap not found with specified SetID")

        // use data of first track as set data
        let box = NSaddBeatmapList.addpreviewbox(data, list);
        box.sid = data.SetID;
        NSaddBeatmapList.addMoreInfo(box, data);
        box.onclick = function(e) {
            // this is effective only when box.data is available
            createDifficultyList(box, e);
            startdownload(box);
        }
        if (window.beatmaplistLoadedCallback) {
            window.beatmaplistLoadedCallback();
            window.beatmaplistLoadedCallback = null;
            // to make sure it's called only once
        }
    }
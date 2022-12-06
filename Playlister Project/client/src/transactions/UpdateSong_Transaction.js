import jsTPS_Transaction from "../common/jsTPS.js"

export default class UpdateSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initOldSongData, initNewSongData) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.oldSongData = initOldSongData;
        this.newSongData = initNewSongData;
    }

    doTransaction() {
        this.store.updateSong(this.index, this.newSongData);
    }
    
    undoTransaction() {
        this.store.updateSong(this.index, this.oldSongData);
    }
}
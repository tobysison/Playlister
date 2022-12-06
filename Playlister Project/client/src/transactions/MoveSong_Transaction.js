import jsTPS_Transaction from "../common/jsTPS.js"

export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initOldSongIndex, initNewSongIndex) {
        super();
        this.store = initStore;
        this.oldSongIndex = initOldSongIndex;
        this.newSongIndex = initNewSongIndex;
    }

    doTransaction() {
        this.store.moveSong(this.oldSongIndex, this.newSongIndex);
    }
    
    undoTransaction() {
        this.store.moveSong(this.newSongIndex, this.oldSongIndex);
    }
}
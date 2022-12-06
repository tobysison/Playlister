import jsTPS_Transaction from "../common/jsTPS.js"

export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initIndex, initSong) {
        super();
        this.store = initStore;
        this.index = initIndex;
        this.song = initSong;
    }

    doTransaction() {
        this.store.removeSong(this.index);
    }
    
    undoTransaction() {
        this.store.createSong(this.index, this.song);
    }
}
export class jsTPS_Transaction {

    doTransaction() {
        console.log("doTransaction - MISSING IMPLEMENTATION");
    }
    
    undoTransaction() {
        console.log("undoTransaction - MISSING IMPLEMENTATION");
    }
}

export default class jsTPS {
    constructor() {
        this.transactions = [];
        this.numTransactions = 0;
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }

    isPerformingDo() {
        return this.performingDo;
    }

    isPerformingUndo() {
        return this.performingUndo;
    }

    getSize() {
        return this.transactions.length;
    }

    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToRedo() {
        return (this.mostRecentTransaction+1) < this.numTransactions;
    }

    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }

    addTransaction(transaction) {
        if ((this.mostRecentTransaction < 0) 
            || (this.mostRecentTransaction < (this.transactions.length - 1))) {
                for (let i = this.transactions.length - 1; i > this.mostRecentTransaction; i--) {
                    this.transactions.splice(i, 1);
                }
                this.numTransactions = this.mostRecentTransaction + 2;
        }
        else {
            this.numTransactions++;
        }
        this.transactions[this.mostRecentTransaction+1] = transaction;
        this.doTransaction();
    }

    doTransaction() {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction+1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }

    undoTransaction() {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }

    clearAllTransactions() {
        this.transactions = [];
        this.mostRecentTransaction = -1;      
        this.numTransactions = 0; 
    }

    toString() {        
        let text = "--Number of Transactions: " + this.numTransactions + "\n";
        text += "--Current Index on Stack: " + this.mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (let i = 0; i <= this.mostRecentTransaction; i++) {
            let jT = this.transactions[i];
            text += "----" + jT.toString() + "\n";
        }
        return text;        
    }
}
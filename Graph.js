"use strict";

/**
 * Classe du graphique sur canvas
 */
class Graph {

    /**
     * @param {string} taskcolor
     * @param {number} taskheight
     * @param {Array} solutions
     */
    constructor(taskcolor, taskheight, solutions) {
        this.taskColor = taskcolor;
        this.taskHeight = taskheight;
        this.solutions = solutions;
        this.root = document.querySelector("#root");
        this.ctx = this.root.getContext("2d");
        this.ctx.font = "20px Arial";
        this.populateSelect();
        this.minDuration = parseInt(document.querySelector("#minDuration").value, 10);
        this.maxDuration = parseInt(document.querySelector("#maxDuration").value, 10);
    }

    populateSelect() {
        let select = document.querySelector("#solutionSelect");
        select.addEventListener("change", () => {
            this.printSolution(select.selectedIndex)
        });
        for (let i = 0; i < solutions.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = "Solution " + i;
            option.value = i;
            select.append(option)
        }
    }

    printLinesAndHour() {
        this.ctx.font = "20px Arial";
        for (let i = 0; i < 24; i++) {
            this.ctx.fillRect(i * 60, 0, 1, this.root.height);
            this.ctx.fillText(i + 'h', i * 60, 20)
        }
    }

    printSolution(index) {
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);
        let y = 40;
        let value = this.solutions[index];
        this.root.height = value.shifts.length * (this.taskHeight + 5);
        this.printLinesAndHour();
        value.shifts.forEach((value, index) => {
            let strings = value.tournees[0].debut.split(":");
            let xdeb = parseInt(strings[0], 10) * 60 + parseInt(strings[1], 10);
            value.tournees.forEach(value => {
                // Pour chaque heure de début
                let [debHour, debMin] = value.debut.split(":");
                let x = parseInt(debHour, 10) * 60 + parseInt(debMin, 10);

                // Pour chaque heure de fin
                let [finHour, finMin] = value.fin.split(":");
                let xfin = parseInt(finHour, 10) * 60 + parseInt(finMin, 10);

                // faire un rectangle
                this.ctx.fillStyle = this.taskColor;
                this.ctx.fillRect(x, y, xfin - x, this.taskHeight);
            });
            this.printLimits(xdeb, y);
            y += this.taskHeight + 2
        });
    }

    /**
     * Affiche les limites du shift en rouge l'heure minimale, en bleu la date maximale
     * @param {number} xdeb
     * @param {number} y
     */
    printLimits(xdeb, y) {
        const w = 2;
        this.ctx.fillStyle = "#d00";
        this.ctx.fillRect(xdeb + this.minDuration, y, w, this.taskHeight);
        this.ctx.fillStyle = "#00e";
        this.ctx.fillRect(xdeb + this.maxDuration, y, w, this.taskHeight);
    }

}
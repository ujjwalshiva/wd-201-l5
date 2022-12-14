// models/todo.js
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static async addTask(params) {
            return await Todo.create(params);
        }
        static async showList() {
            console.log("My Todo list \n");

            console.log("Overdue");
            // FILL IN HERE
            const listsOverdue = await Todo.overdue();
            console.log(
                listsOverdue.map((data) => data.displayableString()).join("\n")
            );
            console.log("\n");

            console.log("Due Today");
            // FILL IN HERE

            const listsDueToday = await Todo.dueToday();
            console.log(
                listsDueToday.map((data) => data.displayableString()).join("\n")
            );
            console.log("\n");

            console.log("Due Later");
            // FILL IN HERE
            const listsDueLater = await Todo.dueLater();
            console.log(
                listsDueLater.map((data) => data.displayableString()).join("\n")
            );
        }

        static async overdue() {
            // FILL IN HERE TO RETURN OVERDUE ITEMS
            return Todo.findAll({
                where: {
                    dueDate: {
                        [Op.lt]: new Date(),
                    },
                },
            });
        }

        static async dueToday() {
            // FILL IN HERE TO RETURN ITEMS DUE tODAY
            return Todo.findAll({
                where: {
                    dueDate: {
                        [Op.eq]: new Date(),
                    },
                },
                order: [["id", "ASC"]],
            });
        }

        static async dueLater() {
            // FILL IN HERE TO RETURN ITEMS DUE LATER
            return Todo.findAll({
                where: {
                    dueDate: {
                        [Op.gt]: new Date(),
                    },
                },
                order: [["id", "ASC"]],
            });
        }

        static async markAsComplete(id) {
            // FILL IN HERE TO MARK AN ITEM AS COMPLETE
            return await Todo.update(
                { completed: true },
                {
                    where: { id: id },
                }
            );
        }

        displayableString() {
            let given_checkbox = this.completed ? "[x]" : "[ ]";
            let dateFormat =
                this.dueDate === new Date().toLocaleDateString("en-CA")
                    ? ""
                    : ` ${this.dueDate}`;
            return `${this.id}. ${given_checkbox} ${this.title}${dateFormat}`;
        }
    }
    Todo.init(
        {
            title: DataTypes.STRING,
            dueDate: DataTypes.DATEONLY,
            completed: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Todo",
        }
    );
    return Todo;
};

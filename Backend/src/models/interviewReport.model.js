const mongoose = require("mongoose");


/** The schema should look like.
 * Job description
 * Resume text
 * Self description
 * Technical Questions
 * Bhavioral questions
 * Skill gaps
 * Prep plan
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical questions is required."]
    },
    intention: {
        type: String,
        required: [true, "Intention is required."]
    },
    answer: {
        required: [true, "Answer is required"],
        type: String,
    }
}, {
        _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Behavioral questions are required."]
    },
    intention: {
        type: String,
        required: [true, "Intention is required."]
    },
    answer: {
        required: [true, "Answer is required"],
        type: String,
    }
}, {
        _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    sevearity: {
        type: String,
        emnu: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
},{
        _id: false
})

const preprationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required."]
    }, 
    focus: {
        type: String,
        required: [true, "Topics to which to focus is required."],
    },
    tasks:[{
        type: String,
        required: [true, "Task is required."]
    }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true,
    }, 
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        max: 100,
        min: 0,
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGap: [skillGapSchema],
    preprationPlanSchema: [preprationPlanSchema]
}, {
    timestamps: true
})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel;

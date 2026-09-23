PennController.ResetPrefix()

var showProgressBar = false;
                         
var defaults = [
    "Separator", {
        transfer: 1000,                                      // How long between sentences? (ms)
        normalMessage: "Please wait for the next sentence."  // What is message presented between stims? Can be blank.
    }
];

// trial to collect participant ID - add “IDentry” to sequence
newTrial("IDentry",
    newVar("partID").global(), // declare partID as a global variable
    newText("instr", "Please enter your Prolific ID:").print(),
    newHtml("partpage", "<input type='text' id='partID' name='participant ID' min='1' max='120'>").print(),
    newButton("Next").print().wait(
        getVar("partID").set(v => $("#partID").val()).testNot.is('') // wait for a valid input
    )
)
.log("partID", getVar("partID")); // ;og participant ID
// header to log ID on every trial
// run at the beginning of each trial
Header(
    newVar("partID").global() 
)
.log("partID", getVar("partID")); // log ID for each trial


//practice                     
Template("practice_sentences.csv", row => 
    newTrial("practice",
        newController("AcceptabilityJudgment", {s: row.sentence,
                        as: ["1", "2", "3", "4", "5", "6", "7"],
                        presentAsScale: true,
                        instructions: "Use number keys or click boxes to answer.",
                        leftComment: "(Very unnatural)",
                        rightComment: "(Very natural)"})
            .css("white-space", "nowrap")
            .center()
            .print()
            .log()
            .wait()
        ,
        //feedback
        newText("<p>" + row.feedback + "</p>")
            .center()
            .print()
        ,
        newButton("continue","continue")
            .print("center at 50vw", "middle at 70vh")
            .wait()
    )
    .log("sentence", row.sentence)
)



// this is set up to use classic ibex latin squaring                         
Template("experiment.csv", row => {
    items.push(
        [[row.label, row.item] , "PennController", newTrial(
            newController("AcceptabilityJudgment", {s: row.sentence,
                            as: ["1", "2", "3", "4", "5", "6", "7"],  
                            presentAsScale: true,                             
                            instructions: "Use number keys or click boxes to answer.",    
                            leftComment: "(Very unnatural)", 
                            rightComment: "(Very natural)"})
                .css("white-space", "nowrap")
                .center()
                .print()
                .log()
                .wait()
        )
        .log("sentence", row.sentence)
        .log("counter", __counter_value_from_server__)
        .log("label", row.label)
        .log("latinitem", row.item)]
    );
   return newTrial('_dummy_',null);
})

var items = [
    ["sep", "Separator", { }],
    ["setcounter", "__SetCounter__", { }],
    ["sendresults", "__SendResults__", { }],    
    ["consent", "Form", { html: { include: "consent.html" } }],
    ["demo", "Form", { html: { include: "demo.html" }, validators: { age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019";} } }],
    ["norming", "Form", { html: { include: "norming.html" } }],
    ["startpractice", Message, {consentRequired: false, html: ["div", ["p", "First you can do six practice sentences."]]}],
  // message that experiment is beginning
    ["starter", Message, {consentRequired: false, html: ["div", ["p", "Time to start the main portion of the experiment!"]]}],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ]
];
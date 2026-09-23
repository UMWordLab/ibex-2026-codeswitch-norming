PennController.ResetPrefix()

var shuffleSequence = seq("consent", "demo", "IDentry", "norming",
                            "startpractice",
                            sepWith("sep", rshuffle("practice")),
                            "setcounter",
                            "starter",
                            sepWith("sep", rshuffle(startsWith("switch"))),
                            "sendresults",
                            "completion"
                         )
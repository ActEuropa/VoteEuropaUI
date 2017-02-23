function QuestionElement(id, title, subtitle, options, HasAnswered, expiredate, redditurl) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.options = options;
    this.HasAnswered = HasAnswered;
    this.expiredate = expiredate;
    this.redditurl = redditurl;
}

function VotingPage_Loaded()
{
    LoadQuestions(1);
}

//Test questions:
var qe1 = new QuestionElement(1, "How often should we have discord discussions?", "So, how often?", ["Weekly","Bi-weekly","Monthly","Never"], true, new Date(1490313600000),"reddit.com/r/test1")
var qe2 = new QuestionElement(2, "Is ActEuropa going somewhere?", "Is it?", ["Yes","No","Maybe","Wtf"], true, new Date(1488326400000))
var qe3 = new QuestionElement(3, "Who should we support in the French elections?", "There's the choice between various people, the main candidates being:", ["Emmanuel Macron","François Fillon","Benoît Hamon","Jean-Luc Mélenchon","Yannick Jadot","Marine Le Pen","Sylvain Duriff"], true, new Date(1491177600000), "reddit.com/r/test1")
var qe4 = new QuestionElement(4, "Should all muslims be banned?", "🎵 I can show you the world 🎶 (Except the USA)", ["Yes","No"], false, new Date(1506556800000), "reddit.com/r/test1")
var qe5 = new QuestionElement(5, "Which English food is the worst?", "This is a difficult question.", ["Marmite","Bangers and mash","Cobbler","Black pudding","Devilled kidneys","Jellied eels","Baked beans","Jelly","Pound cake","Spotted dick","Semolina pudding","Liver and onions","All of it"], false, new Date(1503556800000), "reddit.com/r/test1")

var Questions = [qe1,qe2,qe3,qe4, qe5];

function LoadQuestions(page_nb)
{
    //TODO: load questions from the API instead of using test ones.
    var ListItem_html = "<table class=\"listitem\" id=\"$ID\"><tbody><tr><td class=\"listitem_imgwrapper\"><img class=\"voteIcon\" src=\"$VOTEICON\"/></td><td><h4>$TITLE</h4><h5>$TIMELEFT</h5></td></tr></tbody></table>"
    var html = "";
    for (i = 0; i < Questions.length; i++) 
    {
        var iconurl = "img/vote_pending.svg"
        if(Questions[i].HasAnswered) iconurl = "img/vote_done.svg";
        //TODO: if there's less than a day left, show in hours, then in minutes.
        var datestring = ((Questions[i].expiredate.getTime() - new Date().getTime()) / 86400000).toFixed() + " days left"; 
        html = html + ListItem_html.replace("$TITLE",Questions[i].title).replace("$VOTEICON",iconurl).replace("$ID", Questions[i].id).replace("$TIMELEFT",datestring);
    }
    document.getElementsByClassName("selectionarea")[0].innerHTML = html;

    $('table.listitem').click(function() {
       var id = $(this).attr('id');
       $(this).siblings().css("background", "#00294b");
       $(this).siblings().css("cursor","pointer");
       $(this).css("background", "#001f38");
       $(this).css("cursor","default");

       for (i = 0; i < Questions.length; i++) 
       {
           if(Questions[i].id == id)
           {
               document.getElementById("qtitle").innerText = Questions[i].title;
               document.getElementById("qsubtitle").innerText = Questions[i].subtitle;
               if(Questions[i].redditurl == undefined){ $("#redditbutton").css("visibility","hidden"); }
               else { $("#redditbutton").css("visibility","visible");}
               var tbody = document.getElementById("vo_tbody");
               $("#voteoptions > tbody").html("");
               var row = tbody.insertRow();
               var listMode = false;
               $("#voteoptions").css("border-spacing", "24px")
               $("#tablewrapper").css("margin", "0px -24px")
               if(Questions[i].options.length > 4) 
               {
                   listMode = true;
                   $("#voteoptions").css("border-spacing", "4px")
                   $("#tablewrapper").css("margin", "24px -4px")
               }
               for (j = 0; j < Questions[i].options.length; j++) {
                   if(j % 2 == 0 && j>1 || listMode) row = tbody.insertRow();
                   var cell = row.insertCell();
                   cell.setAttribute("class", "VoteButton");
                   cell.innerText = Questions[i].options[j];
                   if(listMode) {
                       cell.style.display = "inline";
                       cell.style.padding = "0px 4px";
                   }
                   else if(Questions[i].options.length == 2){
                       cell.style.height = "202px";
                   }
               }
           }
       }
   });
   //TODO: fix bug where if you click on an option and move the mouse away faster than the animation, the second function gets fired.
   $('table.listitem').hover(
       function() { if($(this).css("background-color") != "rgb(0, 31, 56)") $(this).css("background", "#002443") },
       function() { if($(this).css("background-color") != "rgb(0, 31, 56)") $(this).css("background", "#00294b") }
       );
   //TODO: automatically select the most relevant question (the one with the least time left that hasn't yet been answered)
   //TODO: Fire event on .VoteButton click.
}

function QuestionElement(id, title, subtitle, options, HasAnswered, expiredate) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.options = options;
    this.HasAnswered = HasAnswered;
    this.expiredate = expiredate;
}

function VotingPage_Loaded()
{
    LoadQuestions(1);
}

//Test questions:
var qe1 = new QuestionElement(1, "How often should we have discord discussions?", "So, how often?", ["Weekly","Bi-weekly","Monthly","Never"], true, new Date(1490313600000))
var qe2 = new QuestionElement(2, "Is ActEuropa going somewhere?", "Is it?", ["Yes","No","Maybe","Wtf"], true, new Date(1488326400000))
var qe3 = new QuestionElement(3, "Who should we support in the French elections?", "There's the choice between various people, the main candidates being", ["Emmanuel Macron","François Fillon","Benoît Hamon","JLM"], true, new Date(1491177600000))
var qe4 = new QuestionElement(4, "Should all muslims be banned?", "🎵 I can show you the world 🎶 (Except the USA)", ["Yes","No","Maybe","Wtf"], false, new Date(1506556800000))
var Questions = [qe1,qe2,qe3,qe4];

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
       $(this).css("background", "#001f38");
       for (i = 0; i < Questions.length; i++) 
       {
           if(Questions[i].id == id)
           {
               document.getElementById("qtitle").innerText = Questions[i].title;
               document.getElementById("qsubtitle").innerText = Questions[i].subtitle;
               //TODO: hide options 3/4 when they are null
               document.getElementById("qoption1").innerText = Questions[i].options[0];
               document.getElementById("qoption2").innerText = Questions[i].options[1];
               document.getElementById("qoption3").innerText = Questions[i].options[2];
               document.getElementById("qoption4").innerText = Questions[i].options[3];
           }
       }
   });
   //TODO: automatically select the most relevant question (the one with the least time left that hasn't yet been answered)
   //TODO: check background color, and if it isn't #001f38, change it to #002443 (I tried doing this, but it fucked up because of the animation)
   $('table.listitem').hover(function() {});
}
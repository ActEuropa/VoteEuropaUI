function QuestionElement(id, title, subtitle, options, HasVoted, expiredate, redditurl, randomize, stv) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.options = options;
    this.HasVoted = HasVoted;
    this.expiredate = expiredate;
    this.redditurl = redditurl;
    this.randomize = randomize;
    this.stv = stv;
}

function VotingPage_Loaded()
{
    LoadQuestions(1);
}

//Test questions:
var qe1 = new QuestionElement(1, "How often should we have discord discussions?", "So, how often?", ["Weekly","Bi-weekly","Monthly","Never"], true, new Date(1490313600000),"reddit.com/r/test1",true,false)
var qe2 = new QuestionElement(2, "Is ActEuropa going somewhere?", "Is it?", ["Yes","No","Maybe","Wtf"], true, new Date(1488326400000),true, false, true)
var qe3 = new QuestionElement(3, "Who should we support in the French elections?", "There's the choice between various people, the main candidates being:", ["Emmanuel Macron","François Fillon","Benoît Hamon","Jean-Luc Mélenchon","Yannick Jadot","Marine Le Pen","Sylvain Duriff"], true, new Date(1491177600000), "reddit.com/r/test1",true,true)
var qe4 = new QuestionElement(4, "Should all muslims be banned?", "🎵 I can show you the world 🎶 (Except the USA)", ["Yes","No"], false, new Date(1506556800000), "reddit.com/r/test1",true, false)
var qe5 = new QuestionElement(5, "Which English food is the worst?", "This is a difficult question.", ["Marmite","Bangers and mash","Cobbler","Black pudding","Devilled kidneys","Jellied eels","Baked beans","Jelly","Pound cake","Spotted dick","Semolina pudding","Liver and onions","All of it"], false, new Date(1503556800000), "reddit.com/r/test1",true,false)
var qe6 = new QuestionElement(6, "Which mods should be elected?", "This is an STV Vote that will select the top 4 moderators.", ["anortef","dfractalh","mustwinfullGaming","shootmii","thienge","Tiis"], false, new Date(1499326400000), "https://www.reddit.com/r/acteuropa/comments/5w6xud/moderator_elections_26022017_voting_thread/", true, true)

var Questions = [qe1,qe2,qe3,qe4, qe5, qe6];
var isSTV = false;

function LoadQuestions(page_nb)
{
    //TODO: load questions from the API instead of using test ones.

    //Wait 500 milliseconds to simulate AJAX response delay:
    await(500);
    var ListItem_html = "<table class=\"listitem\" id=\"$ID\"><tbody><tr><td class=\"listitem_imgwrapper\"><img class=\"voteIcon\" src=\"$VOTEICON\"/></td><td><h4>$TITLE</h4><h5>$TIMELEFT</h5></td></tr></tbody></table>"
    var html = "";
    for (i = 0; i < Questions.length; i++) 
    {
        var iconurl = "img/vote_pending.svg"
        if(Questions[i].HasVoted) iconurl = "img/vote_done.svg";
        var timeleft = (Questions[i].expiredate.getTime() - new Date().getTime());
        var datestring = ( timeleft / 86400000).toFixed() + " days left";
        if(timeleft<86400000) datestring = (timeleft / 3600000).toFixed() + " hours left";
        else if(timeleft<7200000) datestring = (timeleft / 60000) + " minutes left";
        else if(timeleft<120000) datestring = (timeleft / 1000) + " seconds left";
        html = html + ListItem_html.replace("$TITLE",Questions[i].title).replace("$VOTEICON",iconurl).replace("$ID", Questions[i].id).replace("$TIMELEFT",datestring);
    }
  document.getElementById("selectionarea").innerHTML = html;
  $("#spinner").hide();
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
               document.getElementById("ConfirmQuestion").innerText = Questions[i].title;
               document.getElementById("qsubtitle").innerText = Questions[i].subtitle;
               if(Questions[i].stv == true){$("#stvwarn").show();$("#stvsubmit").show();}
               else {$("#stvwarn").hide();$("#stvsubmit").hide();}
               if(Questions[i].redditurl == undefined){ $("#redditbutton").css("visibility","hidden"); }
               else { $("#redditbutton").css("visibility","visible");}
               document.getElementById("redditbutton").setAttribute("href",Questions[i].redditurl);
               var tbody = document.getElementById("vo_tbody");
               $("#voteoptions > tbody").html("");
               var row = tbody.insertRow();
               var listMode = false;
               if(Questions[i].stv == true)
               {
                   isSTV = true;
                   $("#voteoptions").css("width", "32px");
                   $("#voteoptions").css("border-spacing", "4px");
                   $("#tablewrapper").css("margin", "0px -4px 6px 0px");
               }
               else 
               {
                   isSTV = false;
                   $("#voteoptions").css("width", "100%");
                   if(Questions[i].options.length > 4){
                       listMode = true;
                       $("#voteoptions").css("width", "100%");
                       $("#voteoptions").css("border-spacing", "4px");
                       $("#tablewrapper").css("margin", "24px -4px");
                   }
                   else{
                       $("#voteoptions").css("border-spacing", "24px");
                       $("#tablewrapper").css("margin", "0px -24px");
                   }
               }
               Questions[i].options = shuffle(Questions[i].options);
               var mdiv = document.getElementById("stvlist");
               mdiv.innerHTML = "";
               for (j = 0; j < Questions[i].options.length; j++) {

                   if(j % 2 == 0 && j>1 || listMode) row = tbody.insertRow();
                   if( isSTV  == true){
                       var nb = row.insertCell();
                       nb.setAttribute("class","Ballot_nb");
                       nb.innerText = (j+1).toString();
                       mdiv.innerHTML = mdiv.innerHTML + "<div class=\"sortitem\"><span class=\"Ballot stv\" unselectable=\"on\" style=\"padding: 0px 4px;\">" + Questions[i].options[j]; + "</span></div>"
                   }
                   else
                   {
                   var cell = row.insertCell();
                   cell.setAttribute("class", "Ballot");
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
               if(isSTV == true){
                   $("stvlist").vSort();
               }
           }
       }
       $('#selectionarea').css('height',$('#votingarea').height()+76);

   });
   $("#archivedbutton").click(function(){
       $("#activebutton").css("visibility","visible");
       $("#archivedbutton").animate({marginLeft: "140px"},{ duration: 600, queue: false, easing: "easeInOutExpo"});
       $("#activebutton").animate({marginRight: "0px"},{ duration: 600, queue: false, easing: "easeInOutExpo"})
       $("#archivedbutton").animate({opacity: "0"},{ duration: 200, queue: false });
       $("#activebutton").animate({opacity: "1"},{ duration: 200, queue: false })
       $("#selectionarea").animate({left: "300px", opacity: "0"},{ duration: 300, queue: false, easing: "easeInExpo", done: function(){
            //TODO: load old posts from API
            $("#selectionarea").animate({left: "-200px"},{ duration:0, queue: false});
            $("#selectionarea").animate({left: "0px", opacity: "1"},{ duration: 300, queue: false, easing: "easeOutExpo" });
            $("#archivedbutton").css("visibility","collapse");
       }});
   });
   $("#activebutton").click(function(){
       $("#archivedbutton").css("visibility","visible");
       $("#archivedbutton").animate({marginLeft: "0px"},{ duration: 600, queue: false, easing: "easeInOutExpo" });
       $("#activebutton").animate({marginRight: "170px"},{ duration: 600, queue: false, easing: "easeInOutExpo" })
       $("#archivedbutton").animate({opacity: "1"},{ duration: 200, queue: false });
       $("#activebutton").animate({opacity: "0"},{ duration: 200, queue: false})
       $("#selectionarea").animate({left: "-200px", opacity: "0"},{ duration: 300, queue: false, easing: "easeInExpo", done: function(){
            //TODO: load old posts from API
            $("#selectionarea").animate({left: "200px"},{ duration:0, queue: false});
            $("#selectionarea").animate({left: "0px", opacity: "1"},{ duration: 300, queue: false, easing: "easeOutExpo" });
            $("#activebutton").css("visibility","collapse");
       }});
   });
   $("#confirmclose").click(function(){
       $("#overlay").hide(300);
   })
   $(document).on('click', '.Ballot', function () {
       if(isSTV == true) return;
      document.getElementById("ConfirmList").innerText = "\"" + this.innerText + "\"";
      $("#ConfirmList").css("text-align","center");
      $("#overlay").css("visibility", "visible");
      $("#overlay").show(300);
   });
      $(document).on('click', '#stvsubmit', function () {
       if(isSTV == true)
       {
        var items = $("#stvlist").children(".sortitem");
        var itemstring = "";
        for (i = 0; i < items.length; i++) 
        {
            itemstring = itemstring + (i+1).toString() +" - " + items[i].innerText + "\n";
        }
        document.getElementById("ConfirmList").innerText = itemstring.trim() ;
        $("#ConfirmList").css("text-align","left");
        $("#overlay").css("visibility", "visible");
        $("#overlay").show(300);
       }


   });
   $('table.listitem').hover(
       function() { if($(this).css("background-color") != "rgb(0, 31, 56)") $(this).css("background", "#002443"); },
       function() { if($(this).css("background-color") != "rgb(0, 31, 56)") $(this).css("background", "#00294b"); }
       );
   //TODO: automatically select the most relevant question (the one with the least time left that hasn't yet been answered)
   //TODO: Fire event on .Ballot click.
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function await(time)
{ var start = new Date().getTime(); for (var i = 0; i < 1e7; i++) {if ((new Date().getTime() - start) > time){break;}} }

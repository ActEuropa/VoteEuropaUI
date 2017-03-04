function ShowMD() {
    var md = "";
    jQuery.get('../Documents/Manifesto/EN.md', function(data) {
        md = data;
        $("#mainarticle").html(snarkdown(md));
    });
          
}
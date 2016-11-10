/**
 * Created by daniel on 09.11.16.
 */
$(document).ready(function(){
    $(".content").hide();
    $("#recipe-form-display").show();

    $("#menu a").click(function(event){
        $(".content").hide();
        $(event.target.hash).show();
    });
});
/**
 * Created by daniel on 09.11.16.
 */
var ingredient_template = $("#ingredient-template").html();
var step_template = $("#step-template").html();

var num_ingredients=1;
var num_steps=1;


function get_steps(){
    return $.map($("#step-list").children(), function(obj,idx){
        var ingredient = $(obj);
        return {
            description: ingredient.find(".description").val(),
            temperature: ingredient.find(".temperature").val(),
            duration: ingredient.find(".duration").val()
        };
    });
}
function get_ingredient_list(selector){
    return $.map($(selector).children(),function(obj,idx){
        var ingredient = $(obj);
        return {
            ingredient: ingredient.find(".ingredient").val(),
            amount: ingredient.find(".amount").val(),
            unit: ingredient.find(".unit").val()
        };
    });
}
function get_ingredients() {
    return {
        malts: get_ingredient_list("#malt-list"),
        hops: get_ingredient_list("#hop-list"),
        yeast: get_ingredient_list("#yeast-list")
    };
}

$(document).ready(function(){
    Mustache.parse(ingredient_template);
    Mustache.parse(step_template);

    $(".content").hide();
    $("#recipe-form-display").show();
    $(".ingredient-list").append(Mustache.render(ingredient_template,{num: num_ingredients++}));
    $("#step-list").append(Mustache.render(step_template,{num: num_steps++}));


    $("#menu a").click(function(event){
        $(".content").hide();
        $(event.target.hash).show();
    });
    
    $(document).on("click", ".add-ingredient", function () {
        $(this).parent().parent().after(Mustache.render(ingredient_template,{num: num_ingredients++}));
    });

    $(document).on("click", ".add-step", function () {
        $(this).parent().parent().after(Mustache.render(step_template,{num: num_steps++}));
        $(".row-num").each(function (idx) {
            $(this).html((idx+1) + ".");
        });
    });
    
    $("#save-recipe").click(function () {
        var recipe = {
            name: $("#recipe-name").val(),
            ingredients: get_ingredients(),
            remark: $("#recipe-remark").val(),
            steps: get_steps()
        }
        console.log(recipe);
    });

});

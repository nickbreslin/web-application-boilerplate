$(document).ready(function(){

	jQuery.ajax({    
        type: 'POST',
        url:'/api/',
        data: JSON.stringify({url:url}),
        dataType:'json',
        cache:false,
    }).done(function(e) {
        setTimeout( function() {
        	fadeOut();
        }, 3000);
        display(e);
        return false;
    }).error(function(e, t, m) {
    	console.log(e);
        return;
    });
});





function display(e) {

		"use strict";

		var template, html = "";

	
	jQuery('.js-screenshot').html('<img class="img-responsive" src="http://www.woolclad.com/reviews/'+e.results+'/screenshot.png">');

	jQuery.ajax({    
        type: 'POST',
        url:'http://www.woolclad.com/summary.php',
        data: JSON.stringify({key:e.results}),
        dataType:'json',
        cache:false,
    }).done(function(e) {
    	template = JST["templates/debug.handlebars"];
    	var forms = e.forms;
    	var scripts = e.scripts;
    	var tags = e.tags;


    	//delete e.forms;
    	//delete e.scripts;
    	//delete e.tags;

        //html += template({'values':e});
        /*html += "<hr>";
        html += "<br><h3>Forms</h3><br>";

        for(var x = 0; x < Object.size(forms); x++) {
        	var e = {};
        	e.top = forms[x].position.top;
        	e.elements = forms[x].elements;
	        html += template({'values':e});
	    }

	    html += "<hr>";
        html += "<br><h3>Scripts</h3><br>";
        html += template({'values':scripts});

         html += "<hr>";
        html += "<br><h3>Tags</h3><br>";
        html += template({'values':tags});
        */
        var data = {};

        //------------------------------------
        
         data['Title Length'] = {
            'value'  : e.seo['Title Length'],
            'status' : 'success'
        }

        if(e.seo['Title Length'] == 0) {
            data['Title Length'].status = "danger";
            data['Title Length'].link = "#";
        }

        else if(e.seo['Title Length'] > 70) {
            data['Title Length'].status = "warning";
            data['Title Length'].link = "#";
        }

        //-------------------------------------
        //
        data['Meta Desc Length'] = {
            'value'  : e.seo['Meta Desc Length'],
            'status' : 'success'
        }

        if(e.seo['Meta Desc Length'] == 0) {
            data['Meta Desc Length'].status = "danger";
            data['Meta Desc Length'].link = "#";
        }

        else if(e.seo['Meta Desc Length'] > 155) {
            data['Meta Desc Length'].status = "warning";
            data['Meta Desc Length'].link = "#";
        }

        //------------------------------------
        
         data['h1'] = {
            'value'  : e.seo['h1'],
            'status' : 'success'
        }

        if(e.seo['h1'] == 0) {
            data['h1'].status = "danger";
            data['h1'].link = "#";
        }

        else if(e.seo['h1'] > 1) {
            data['h1'].status = "warning";
            data['h1'].link = "#";
        }


        //-------------------------------------
        //
        //
        //------------------------------------
        
        html += "<br><h3>SEO</h3><br>";
        html += template({'values':data});





        var data = {};

        //------------------------------------
        
         data['Form Count'] = {
            'value'  : e['form_count'],
            'status' : 'success'
        }

        if(e.seo['form_count'] == 0) {
            data['Form Count'].status = "danger";
            data['Form Count'].link = "#";
        }

        else if(e.seo['form_count'] > 3) {
            data['Form Count'].status = "warning";
            data['Form Count'].link = "#";
        }

        //------------------------------------

        for(var x = 0; x < Object.size(forms); x++) {
            var e = {};
            var top = forms[x].position.top;
            e.elements = forms[x].elements;
            var height = forms[x].height;
            html += template({'values':e});
            

            var vis_desktop = 0;
            if(top > 768) {
                vis_desktop = 0;
            } else if(top + height <= 768) {
                vis_desktop = 100;
            } else {
                //visible is 768 - top;
                var vis = 768-top;
                vis_desktop = 100 / height * vis; 
            }

            var vis_mobile = 0;
            if(top > 600) {
                vis_mobile = 0;
            } else if(top + height <= 600) {
                vis_mobile = 100;
            } else {
                //visible is 768 - top;
                var vis = 600-top;
                vis_mobile = 100 / height * vis; 
            }

            var n = x + 1;

            data['Form ' + n + ' Fields'] = {};
            data['Form ' + n + ' Fields'].status = "";
            data['Form ' + n + ' Fields'].value = forms[x].elements;




            data['Form ' + n + ' Desktop Visibility'] = {};
            data['Form ' + n + ' Desktop Visibility'].status = "";
            data['Form ' + n + ' Desktop Visibility'].value = Math.round(vis_desktop) + "%";

            data['Form ' + n + ' Mobile Visibility'] = {};
            data['Form ' + n + ' Mobile Visibility'].status = "";
            data['Form ' + n + ' Mobile Visibility'].value = Math.round(vis_mobile) + "%";


               data['Form ' + n + ' Form Optimization'] = {
            'value'  : opt,
            'status' : 'success'
        }
        }





        html += "<br><h3>Forms</h3><br>";
        html += template({'values':data});

        document.getElementById("js-dump").innerHTML = html;

        return false;
    }).error(function(e, t, m) {
    	console.log(e);
        return;
    });

	jQuery('.js-title').html('<h1>Analysis for<br><small>'+url+'</small></h1>');
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
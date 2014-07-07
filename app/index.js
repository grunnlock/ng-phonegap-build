// Main app object
var app = {

    initialize: function() {

        $(function() {

            // Init FastClick
            FastClick.attach(document.body);

        });

    }

}

// Check if the device is connected to internet
function networkStatus() {
    return true;
}

// Handle alerts
function alertBox(type, titre, txt, fonction, fonction_2, boutons) {

    if (type == "confirm") {
    
        if (confirm(txt) == true) {
       
            eval(fonction);
            
        }

    } else if (type == "custom") {
    
        if (confirm(txt) == true) {
       
            eval(fonction);
            
        } else {
            
            eval(fonction_2);
            
        }
        
    } else {

        alert(txt);

    }
    
}
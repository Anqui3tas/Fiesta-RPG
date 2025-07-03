//
//  ReadMe.md
//  Fiesta
//
//  Created by Quentin on 7/3/25.
//

A few notes:

First, after building/deploying from MZ, update the js/rmmz_managers.js to include this update:

SceneManager.isGameActive = function() {
    return true; //THIS IS WHAT IS ADDED
   
    try {
        return window.top.document.hasFocus();
    } catch (e) {
        return true;
    }
};

//currently works on xcode 26
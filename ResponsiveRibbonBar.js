        //Initialize WindowWidth variable with initial width
		//All variables that end in group are your custom IDs for the number of tabs (tab contents = groups)
		var WindowWidth = $(window).width();
        var FileGroup = $('#File');
        var AdministrationGroup = $('#Administration');
        var OptionsGroup = $('#Options');
		//Initialize ActiveGroup variable with default active tab 
        var ActiveGroup = FileGroup;
		//Get children jquery objects in reverse to add responsiveLevel1 class later
        var ActiveGroupChildrenReversed = $($(ActiveGroup).children().get().reverse());

		//Call ResponsiveBar function on document.ready, on window.load, and on window resize:
        $(document).ready(function () {
            ResponsiveBar(WindowWidth);
        });
        $(window).load(function () {
            ResponsiveBar(WindowWidth);
        });

        var resizeTimer;
        $(window).on('resize', function (e) {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                var newWidth = $(window).width();
                // Run code here, resizing has "stopped"
                ResponsiveBar(newWidth);
            }, 250);

        });

		//Set Active tab group depending on which tab was clicked
        $('.ribbon_tabs').click(function () {
            var ActiveTab = $(this).prop("id");
            if (ActiveTab == 'FileTab') {
                ActiveGroup = FileGroup;
                ActiveGroupChildrenReversed = $($(ActiveGroup).children().get().reverse());
                WindowWidth = $(window).width();
                ResponsiveBar(WindowWidth);
            }
            else if (ActiveTab == 'AdministrationTab') {
                ActiveGroup = AdministrationGroup;
                ActiveGroupChildrenReversed = $($(ActiveGroup).children().get().reverse());
                WindowWidth = $(window).width();
                ResponsiveBar(WindowWidth);
            }
            else if (ActiveTab == 'OptionsTab') {
                ActiveGroup = OptionsGroup;
                ActiveGroupChildrenReversed = $($(ActiveGroup).children().get().reverse());
                WindowWidth = $(window).width();
                ResponsiveBar(WindowWidth);
            }
        });
		
		//Function that adds or removes responsive classes that accepts the current window width as a parameter
		//It first removes responsive classes in case of window resize or tab switch.
		//responsiveLevel1 class hides normal image and shows button sized image.
		//responsiveLevel2 hides span that contains button text.
        function ResponsiveBar(currentWindowWidth) {
            ActiveGroupChildrenReversed.each(function () {
                $(this).removeClass('responsiveLevel1');
                $(this).removeClass('responsiveLevel2');
            });

            // compare if window width is equal to active group width.
			// If true, add responsiveLevel1 class to current child starting from last to first.
            if (currentWindowWidth == $(ActiveGroup).width()) {
                ActiveGroupChildrenReversed.each(function () {
                    $(this).addClass('responsiveLevel1');
					// If the window width is greater that active group width, stop funcion.
                    if (currentWindowWidth > $(ActiveGroup).width())
                        return false;
                });
            }

            // compare if window width is still equal to active group.
			//If true, add responsiveLevel2 class to current child starting from last to first.
            if (currentWindowWidth == $(ActiveGroup).width()) {
                ActiveGroupChildrenReversed.each(function () {
                    $(this).addClass('responsiveLevel2');
					//If the window width is greater that the active group width, stop function.
					// this will work because active group width will never be smaller than small mobile screens.
                    if (currentWindowWidth > $(ActiveGroup).width())
                        return false;
                });
            }
        }

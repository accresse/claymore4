$.get("/claymore/api/user", function(data) {
        $("#user").html('Welcome, '+data.userAuthentication.details.given_name);
        $(".unauthenticated").hide()
        $(".authenticated").show()
    }
);
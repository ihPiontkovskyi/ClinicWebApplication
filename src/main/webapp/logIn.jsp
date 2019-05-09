<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: piont
  Date: 5/9/2019
  Time: 3:15 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Log In</title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
<c:if test="${not empty loginError}">
    <script>
        window.addEventListener("load", function () {
            alert("${loginError}}")
        })
    </script>
</c:if>
<input id="username" type="text" title="Username:">
<input id="password" type="password" title="Password:">
<input class="logIn" type="button" value="Log In">
<script>
    $('.logIn').click(function () {
        if ($('#username').val() == "root" && $('#username').val() == "root") {
            window.location.replace("/examination");
        } else {
            alert("Incorrect username or password");
        }
    });
</script>
</body>
</html>

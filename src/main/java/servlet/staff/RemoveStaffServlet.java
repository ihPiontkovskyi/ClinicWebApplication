package servlet.staff;

import model.Staff;
import servlet.AbstractServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DeleteStaff")
public class RemoveStaffServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Staff staff = getStaffService().findById(Integer.parseInt(getStringParam(request, "id")));
        getStaffService().delete(staff);
    }
}
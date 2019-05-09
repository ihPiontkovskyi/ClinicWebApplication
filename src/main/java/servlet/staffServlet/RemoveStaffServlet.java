package servlet.staffServlet;

import model.Diagnosis;
import model.Staff;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DeleteStaff")
public class RemoveStaffServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {
        Staff staff = getStaffService().findById(Integer.parseInt(getStringParam(request,"id")));
        getStaffService().delete(staff);
    }
}
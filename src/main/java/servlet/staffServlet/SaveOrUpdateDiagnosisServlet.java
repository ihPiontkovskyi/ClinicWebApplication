package servlet.staffServlet;

import model.Diagnosis;
import model.Staff;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/SaveOrUpdateStaff")
public class SaveOrUpdateDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        Staff staff = new Staff();
        staff.setStaffId(Integer.parseInt(getStringParam(request,"id")));
          staff.setFullName(getStringParam(request,"name"));
        staff.setSpecialization(getSpecializationService().findById(Integer.parseInt(getStringParam(request,"specialization"))));
        getStaffService().saveOrUpdate(staff);
        forward("staff.jsp", request, response);
    }
}
package servlet.staff;

import model.Staff;
import servlet.AbstractServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SaveOrUpdateStaff")
public class SaveOrUpdateDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Staff staff = new Staff();
        staff.setStaffId(Integer.parseInt(getStringParam(request, "id")));
        staff.setFullName(getStringParam(request, "name"));
        staff.setSpecialization(getSpecializationService().findById(Integer.parseInt(getStringParam(request, "specialization"))));
        getStaffService().saveOrUpdate(staff);
    }
}
package service.impl;

import dto.EntityDTO;
import model.Patient;
import model.Staff;
import service.EntityService;

import java.util.HashSet;

public class StaffServiceImpl implements EntityService<Staff> {
    private EntityDTO examinationDTO = new EntityDTO<>(Staff.class);

    @Override
    public HashSet findAll() {
        return examinationDTO.findAll();
    }

    @Override
    public void delete(Staff staff) {
        examinationDTO.delete(staff);
    }

    @Override
    public void saveOrUpdate(Staff staff) {
        examinationDTO.saveOrUpdate(staff);
    }

    @Override
    public Staff findById(Integer id) {
        return (Staff) examinationDTO.findById(id);
    }
}

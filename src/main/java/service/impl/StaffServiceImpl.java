package service.impl;

import dto.EntityDTO;
import model.Staff;
import service.EntityService;

import java.util.HashSet;

public class StaffServiceImpl implements EntityService<Staff> {
    private EntityDTO<Staff> staffDTO = new EntityDTO<>(Staff.class);

    @Override
    public HashSet<? extends Staff> findAll() {
        return staffDTO.findAll();
    }

    @Override
    public void delete(Staff staff) {
        staffDTO.delete(staff);
    }

    @Override
    public void saveOrUpdate(Staff staff) {
        staffDTO.saveOrUpdate(staff);
    }

    @Override
    public Staff findById(Integer id) {
        return staffDTO.findById(id);
    }

}

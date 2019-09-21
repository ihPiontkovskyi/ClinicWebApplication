package service.impl;

import dto.EntityDTO;
import model.Specialization;
import service.EntityService;

import java.util.HashSet;

public class SpecializationServiceImpl implements EntityService<Specialization> {
    private EntityDTO<Specialization> specializationDTO = new EntityDTO<>(Specialization.class);

    @Override
    public HashSet findAll() {
        return specializationDTO.findAll();
    }

    @Override
    public void delete(Specialization specialization) {
        specializationDTO.delete(specialization);
    }

    @Override
    public void saveOrUpdate(Specialization specialization) {
        specializationDTO.saveOrUpdate(specialization);
    }

    @Override
    public Specialization findById(Integer id) {
        return specializationDTO.findById(id);
    }

}

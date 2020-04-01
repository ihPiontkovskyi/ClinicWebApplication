package service.impl;

import dto.EntityDTO;
import model.Specialization;
import service.EntityService;

import java.util.HashSet;

public class SpecializationServiceImpl implements EntityService<Specialization> {
    private static final EntityDTO<Specialization> SPECIALIZATION_DTO = new EntityDTO<>(Specialization.class);

    @Override
    public HashSet<? extends Specialization> findAll() {
        return SPECIALIZATION_DTO.findAll();
    }

    @Override
    public void delete(Specialization specialization) {
        SPECIALIZATION_DTO.delete(specialization);
    }

    @Override
    public void saveOrUpdate(Specialization specialization) {
        SPECIALIZATION_DTO.saveOrUpdate(specialization);
    }

    @Override
    public Specialization findById(Integer id) {
        return SPECIALIZATION_DTO.findById(id);
    }

}

package service.impl;

import dto.EntityDTO;
import model.Patient;
import model.Specialization;
import service.EntityService;

import java.util.HashSet;

public class SpecializationServiceImpl implements EntityService<Specialization> {
    private EntityDTO specizalizationDTO = new EntityDTO<>(Specialization.class);

    @Override
    public HashSet findAll() {
        return specizalizationDTO.findAll();
    }

    @Override
    public void delete(Specialization specialization) {
        specizalizationDTO.delete(specialization);
    }

    @Override
    public void saveOrUpdate(Specialization specialization) {
        specizalizationDTO.saveOrUpdate(specialization);
    }

    @Override
    public Specialization findById(Integer id) {
        return (Specialization) specizalizationDTO.findById(id);
    }
}

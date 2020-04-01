package service.impl;

import dto.EntityDTO;
import model.Examination;
import service.EntityService;

import java.util.HashSet;

public class ExaminationServiceImpl implements EntityService<Examination> {
    private EntityDTO<Examination> examinationDTO = new EntityDTO<>(Examination.class);

    @Override
    public HashSet findAll() {
        return examinationDTO.findAll();
    }

    @Override
    public void delete(Examination examination) {
        examinationDTO.delete(examination);
    }

    @Override
    public void saveOrUpdate(Examination examination) {
        examinationDTO.saveOrUpdate(examination);
    }

    @Override
    public Examination findById(Integer id) {
        return examinationDTO.findById(id);
    }
}

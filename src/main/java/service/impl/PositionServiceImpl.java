package service.impl;

import dto.EntityDTO;
import model.Position;
import service.EntityService;

import java.util.HashSet;

public class PositionServiceImpl implements EntityService<Position> {
    private static final EntityDTO<Position> POSITION_DTO = new EntityDTO<>(Position.class);

    @Override
    public HashSet<? extends Position> findAll() {
        return POSITION_DTO.findAll();
    }

    @Override
    public void delete(Position position) {
        POSITION_DTO.delete(position);
    }

    @Override
    public void saveOrUpdate(Position position) {
        POSITION_DTO.saveOrUpdate(position);
    }

    @Override
    public Position findById(Integer id) {
        return POSITION_DTO.findById(id);
    }
}

package service;

import java.util.HashSet;

public interface EntityService<T> {

    HashSet findAll();

    void delete(T t);

    void saveOrUpdate(T t);

    T findById(Integer id);
}

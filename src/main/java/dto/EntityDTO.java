package dto;

import lombok.Data;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import util.HibernateSessionFactoryUtil;

import java.util.HashSet;
import java.util.concurrent.atomic.AtomicReference;

@Data
public class EntityDTO<T> {
    HashSet<T> set = new HashSet<>();
    private Class typeParameterClass;

    public EntityDTO(Class typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }

    public HashSet<?> findAll() {
        set.clear();
        HibernateSessionFactoryUtil.doInHibernateSession(session -> {
            Query query = session.createQuery("from " + typeParameterClass.getCanonicalName());
            set.addAll(query.list());
        });
        return set;
    }

    public T findById(Integer id) {
        AtomicReference<T> res = new AtomicReference<>();
        HibernateSessionFactoryUtil.doInHibernateSession(session -> res.set((T) session.get(typeParameterClass, id)));
        return res.get();
    }

    public void delete(T t) {
        HibernateSessionFactoryUtil.doInHibernateSession(session -> {
            Transaction tx1 = session.beginTransaction();
            session.delete(t);
            tx1.commit();
        });
    }

    public void saveOrUpdate(T t) {
        HibernateSessionFactoryUtil.doInHibernateSession(session -> {
            Transaction tx1 = session.beginTransaction();
            session.saveOrUpdate(t);
            tx1.commit();
        });
    }
}

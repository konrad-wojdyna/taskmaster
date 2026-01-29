package com.taskmaster.api.repository;

import com.taskmaster.api.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    @Query("SELECT t FROM Task t JOIN FETCH t.user WHERE t.id = :taskId AND t.user.id = :userId")
    Optional<Task> findByIdAndUserId(@Param("taskId") Long taskId, @Param("userId") Long userId);

    @Query("SELECT t FROM Task t JOIN FETCH t.user WHERE t.user.id = :userId")
    List<Task> findAllByUserId(@Param("userId") Long userId);
}

package com.example.taskmanager.repository; // Ajusta se necessário

import com.example.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Ao extender o JpaRepository, ganhas acesso imediato a funções como:
    // save(), findAll(), findById(), deleteById(), etc.
}
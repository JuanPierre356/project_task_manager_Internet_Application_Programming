package com.example.taskmanager.controller; // Ajusta se o teu Group for diferente

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // Permite pedidos vindos do teu React
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Devolve a lista de todas as tarefas
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Ação: Adicionar Tarefa (Recebe os dados do input e guarda na base de dados)
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // Ação: Alternar Concluído/Incompleto (Procura a tarefa pelo ID e inverte o estado)
    @PutMapping("/{id}")
    public ResponseEntity<Task> toggleTaskCompleted(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(!task.isCompleted());
                    Task updatedTask = taskRepository.save(task);
                    return ResponseEntity.ok().body(updatedTask);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Ação: Apagar Tarefa (Procura a tarefa pelo ID e remove-a da base de dados)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    taskRepository.delete(task);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
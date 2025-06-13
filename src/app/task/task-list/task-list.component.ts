import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { TaskService } from '../services/task.services';
import { Task } from 'src/app/interfaces/task.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editForm!: FormGroup;
  selectedTask: Task | null = null;
  modalInstance!: Modal;

  @ViewChild('editModal') editModalRef!: ElementRef;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required],
      status: ['pending', Validators.required],
    });
  }

  onMarkComplete(task: Task): void {
    if (!task._id) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';

    this.taskService.updateTaskStatus(task._id, newStatus).subscribe({
      next: () => {
        task.status = newStatus;
      },
      error: (err) => {
        console.error('Error updating task status:', err);
      },
    });
  }

  editTask(task: Task): void {
    this.selectedTask = task;
    this.editForm.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate?.substring(0, 10),
      status: task.status,
    });

    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      this.modalInstance = new Modal(this.editModalRef.nativeElement);
      this.modalInstance.show();
    }
  }

  addNewTask(): void {
    this.selectedTask = null;
    this.editForm.reset({ priority: 'medium', status: 'pending' });
    this.modalInstance = new Modal(this.editModalRef.nativeElement);
    this.modalInstance.show();
  }

  saveChanges(): void {
    if (this.editForm.invalid) return;

    const currentUser = this.authService.getUser();
    if (!currentUser) {
      alert('Usuario no autenticado');
      return;
    }

    const taskData: Task = {
      ...this.editForm.value,
      _id: this.selectedTask?._id,
      assignedTo: currentUser.uid,
    };

    if (this.selectedTask?._id) {
      this.taskService.updateTask(taskData._id!, taskData).subscribe((res) => {
        const index = this.tasks.findIndex((t) => t._id === res._id);
        if (index !== -1) this.tasks[index] = res;
        this.modalInstance.hide();
        console.log('Updating task with data:', taskData);
      });
    } else {
      this.taskService.createTask(taskData).subscribe((newTask) => {
        this.tasks.push(newTask);
        this.modalInstance.hide();
        console.log('Creating task with data:', taskData);
      });
    }
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== taskId);
    });
  }

  trackByTaskId(index: number, task: Task): string {
    return task._id!;
  }
}

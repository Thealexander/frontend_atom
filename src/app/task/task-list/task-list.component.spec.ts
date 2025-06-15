import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../services/task.services';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const taskSpy = jasmine.createSpyObj('TaskService', ['getTasks']);
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser']);

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: TaskService, useValue: taskSpy },
        { provide: AuthService, useValue: authSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], // ignora errores por elementos desconocidos en la plantilla
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const mockTasks = [{ _id: '1', title: 'Task A', status: 'pending' }] as any;
    taskServiceSpy.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.tasks).toEqual(mockTasks);
    expect(taskServiceSpy.getTasks).toHaveBeenCalled();
  });
});

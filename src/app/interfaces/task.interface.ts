export interface Task {
  _id?: string; // opcional en creación, obligatorio en edición/borrado
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // en formato YYYY-MM-DD
  assignedTo: string; // UID del usuario
}
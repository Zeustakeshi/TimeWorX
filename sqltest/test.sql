
SELECT 
  u.name AS username,
  SUM(CASE WHEN t.status_key = 'to-do' THEN 1 ELSE 0 END) AS todo,
  SUM(CASE WHEN t.status_key = 'in_progress' THEN 1 ELSE 0 END) AS in_progress,
  SUM(CASE WHEN t.status_key = 'verify' THEN 1 ELSE 0 END) AS verify,
  SUM(CASE WHEN t.status_key = 'done' THEN 1 ELSE 0 END) AS done,
  COUNT(t.task_id) AS countTask
FROM task_user tu
JOIN users u ON tu.user_id = u.id
JOIN tasks t ON tu.task_id = t.task_id
WHERE t.project_id = 1
GROUP BY u.name;





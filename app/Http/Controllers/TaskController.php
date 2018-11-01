<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate(['title' => 'required']);

        $task = Task::create([
            'title' => $validateData['title'],
            'project_id' = $request->project_id
        ]);

        return response()->toJson('Task update!');
    }

    public function markAsCompleted(Task $task)
    {
        $task->is_completed = true;
        $task->update();

        return response()->toJson('Task updated!');
    }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "asc" } });
  const normalized = tasks.map((task) => ({
    ...task,
    priority: task.priority || "Medium",
  }));
  return NextResponse.json(normalized);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, category, priority, dueTime, dateKey } = body;

  if (!title || !category || !dateKey) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      category,
      priority: priority || "Medium",
      dueTime: dueTime || null,
      dateKey,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
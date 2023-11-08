"use server";

import { prisma } from "@/utils/prismaClient";
import { getAuthSession } from "@/utils/auth";
import { revalidatePath } from "next/cache";

export async function getUser() {
  try {
    const session = await getAuthSession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    const users = await prisma.user.findMany();
    return { users };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getTask() {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const tasks = await prisma.task.findMany({ include: { user: true } });
    return { tasks };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function createTask(formData: FormData) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const task = formData.get("task");
    if (!task) {
      throw new Error("Task is required");
    }

    await prisma.task.create({
      data: {
        task: task as string,
        user: {
          connect: {
            id: session.user._id,
          },
        },
      },
    });

    revalidatePath("/");
    return {
      success: true,
      statusCode: 201,
      message: "Task created successfully",
    };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function deleteTask(id: number) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user._id,
      },
      include: {
        tasks: true,
      },
    });

    await prisma.task.delete({
      where: {
        id,
      },
    });

    user?.tasks.splice(id, 1);

    revalidatePath("/");

    return { message: `task deleted successfully` };
  } catch (err: any) {
    return { error: err.message };
  }
}

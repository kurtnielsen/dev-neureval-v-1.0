import { userService } from '@/services/user-service';
import { NextResponse } from 'next/server';
import { NewUser } from '@/models/schema';

export async function GET() {
  try {
    const usersList = await userService.getAllUsers();
    return NextResponse.json(usersList);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user: NewUser = await req.json();
    const newUser = await userService.createUser(user);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getBookedSlotsForDate } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ success: false, error: 'Date requise' }, { status: 400 });
    }

    const bookedSlots = getBookedSlotsForDate(date);
    return NextResponse.json({
      success: true,
      date,
      bookedSlots,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

// 1. BUSINESS CONSTANTS & WHATSAPP
describe('Auto-école Babaaissa Official Business Information', () => {
  const BUSINESS_INFO = {
    name: 'Auto-école Babaaissa',
    nameAr: 'مدرسة تعليم السياقة باباعيسى',
    city: 'Bouarfa',
    address: 'Hay Al Wahda N°1, Bouarfa',
    phone: '0626783160',
    whatsappNumber: '212626783160',
  };

  test('Official phone and address match Bouarfa mandate', () => {
    assert.equal(BUSINESS_INFO.phone, '0626783160');
    assert.equal(BUSINESS_INFO.address, 'Hay Al Wahda N°1, Bouarfa');
    assert.equal(BUSINESS_INFO.city, 'Bouarfa');
  });

  test('WhatsApp click-to-chat URL is correctly formatted for Morocco (+212)', () => {
    function getWhatsAppLink(lang = 'fr') {
      const msg =
        lang === 'ar'
          ? 'السلام عليكم، أريد الحصول على معلومات حول دروس السياقة في مدرسة باباعيسى.'
          : 'Bonjour Auto-école Babaaissa, je souhaite obtenir des informations sur vos cours de conduite.';
      return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    }

    const frUrl = getWhatsAppLink('fr');
    const arUrl = getWhatsAppLink('ar');

    assert.ok(frUrl.startsWith('https://wa.me/212626783160'));
    assert.ok(frUrl.includes(encodeURIComponent('Bonjour Auto-école Babaaissa')));
    assert.ok(arUrl.startsWith('https://wa.me/212626783160'));
    assert.ok(arUrl.includes(encodeURIComponent('مدرسة باباعيسى')));
  });
});

// 2. EXAM SCORING & PASSING LOGIC
describe('Exam Simulator Scoring & Passing Rules', () => {
  const examSettings = {
    examPassingScore: 32,
    totalExamQuestions: 40,
  };

  function evaluateExam(questions, userAnswers) {
    let score = 0;
    const review = questions.map((q) => {
      const chosen = userAnswers[q.id];
      const isCorrect = chosen === q.correctIndex;
      if (isCorrect) score++;
      return {
        questionId: q.id,
        isCorrect,
        correctIndex: q.correctIndex,
        chosen,
      };
    });

    const passThresholdRatio = examSettings.examPassingScore / examSettings.totalExamQuestions;
    const minPassScore = Math.ceil(questions.length * passThresholdRatio);
    const passed = score >= minPassScore;

    return { score, total: questions.length, minPassScore, passed, review };
  }

  const sampleQuestions = [
    { id: 'q1', correctIndex: 1 },
    { id: 'q2', correctIndex: 2 },
    { id: 'q3', correctIndex: 0 },
    { id: 'q4', correctIndex: 3 },
    { id: 'q5', correctIndex: 1 },
  ];

  test('Calculates score and detects pass status correctly', () => {
    // 5 out of 5 correct (100% >= 80%)
    const perfectAnswers = { q1: 1, q2: 2, q3: 0, q4: 3, q5: 1 };
    const res = evaluateExam(sampleQuestions, perfectAnswers);
    assert.equal(res.score, 5);
    assert.equal(res.passed, true);
    assert.equal(res.minPassScore, 4); // 5 * 0.8 = 4
  });

  test('Fails test when score is below passing threshold', () => {
    // 2 out of 5 correct (40% < 80%)
    const failedAnswers = { q1: 1, q2: 0, q3: 1, q4: 2, q5: 1 };
    const res = evaluateExam(sampleQuestions, failedAnswers);
    assert.equal(res.score, 2);
    assert.equal(res.passed, false);
  });
});

// 3. BOOKING CONCURRENCY & DOUBLE-BOOKING PREVENTION
describe('Driving Lesson Booking Concurrency Protection', () => {
  const existingBookings = [
    {
      id: 'b1',
      date: '2026-10-25',
      timeSlot: '10:00 - 11:00',
      status: 'CONFIRMED',
    },
    {
      id: 'b2',
      date: '2026-10-25',
      timeSlot: '14:00 - 15:00',
      status: 'CANCELLED', // Cancelled slot should become available
    },
  ];

  function attemptBooking(bookings, newDate, newSlot) {
    const conflict = bookings.find(
      (b) =>
        b.date === newDate &&
        b.timeSlot === newSlot &&
        (b.status === 'PENDING' || b.status === 'CONFIRMED')
    );

    if (conflict) {
      return { success: false, error: 'Double-booking conflict rejected' };
    }

    const reference = `BAB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: `b-${Date.now()}`,
      reference,
      date: newDate,
      timeSlot: newSlot,
      status: 'PENDING',
    };
    bookings.push(newBooking);
    return { success: true, booking: newBooking };
  }

  test('Rejects overlapping booking for already confirmed slot', () => {
    const list = [...existingBookings];
    const res = attemptBooking(list, '2026-10-25', '10:00 - 11:00');
    assert.equal(res.success, false);
    assert.match(res.error, /conflict rejected/i);
  });

  test('Accepts booking for free slot or previously cancelled slot', () => {
    const list = [...existingBookings];
    const res = attemptBooking(list, '2026-10-25', '14:00 - 15:00');
    assert.equal(res.success, true);
    assert.ok(res.booking.reference.startsWith('BAB-2026-'));
    assert.equal(res.booking.status, 'PENDING');
  });
});

// 4. AUTHENTICATION & ACCESS CONTROL
describe('Authentication & Token Verification', () => {
  const SECRET = 'test-secret-key';

  function hashPassword(pw) {
    return crypto.createHash('sha256').update(pw + SECRET).digest('hex');
  }

  function signToken(user) {
    const payload = { id: user.id, role: user.role, exp: Date.now() + 10000 };
    const b64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const sig = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
    return `${b64}.${sig}`;
  }

  function verifyToken(token) {
    const [b64, sig] = token.split('.');
    const expected = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(b64, 'base64url').toString('utf-8'));
  }

  test('Hash is deterministic and verifies password', () => {
    const hash = hashPassword('AdminBabaaissa2026!');
    assert.equal(hashPassword('AdminBabaaissa2026!'), hash);
    assert.notEqual(hashPassword('WrongPassword'), hash);
  });

  test('Generates and verifies valid token with role', () => {
    const token = signToken({ id: 'usr-admin', role: 'ADMIN' });
    const payload = verifyToken(token);
    assert.ok(payload);
    assert.equal(payload.id, 'usr-admin');
    assert.equal(payload.role, 'ADMIN');
  });

  test('Rejects tampered tokens', () => {
    const token = signToken({ id: 'usr-student', role: 'STUDENT' });
    const tampered = token.slice(0, -4) + 'abcd';
    const payload = verifyToken(tampered);
    assert.equal(payload, null);
  });
});

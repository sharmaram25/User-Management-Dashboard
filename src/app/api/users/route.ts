import { NextResponse } from 'next/server';
import { User, UserCreateInput } from '@/types/user';

let users: User[] = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit.sharma@email.com",
    phone: "+919876543210",
    address: {
      street: "15 Rajpath Road",
      city: "Mumbai",
      zip: "400001"
    }
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+919876543211",
    address: {
      street: "42 MG Road",
      city: "Bangalore",
      zip: "560001"
    }
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.verma@email.com",
    phone: "+919876543212",
    address: {
      street: "7 Park Street",
      city: "Kolkata",
      zip: "700001"
    }
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+919876543213",
    address: {
      street: "25 Jubilee Hills",
      city: "Hyderabad",
      zip: "500033"
    }
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+919876543214",
    address: {
      street: "88 Civil Lines",
      city: "Delhi",
      zip: "110001"
    }
  },
  {
    id: 6,
    name: "Meera Iyer",
    email: "meera.iyer@email.com",
    phone: "+919876543215",
    address: {
      street: "12 Anna Salai",
      city: "Chennai",
      zip: "600001"
    }
  },
  {
    id: 7,
    name: "Arjun Kumar",
    email: "arjun.kumar@email.com",
    phone: "+919876543216",
    address: {
      street: "56 FC Road",
      city: "Pune",
      zip: "411001"
    }
  },
  {
    id: 8,
    name: "Zara Khan",
    email: "zara.khan@email.com",
    phone: "+919876543217",
    address: {
      street: "33 Relief Road",
      city: "Ahmedabad",
      zip: "380001"
    }
  },
  {
    id: 9,
    name: "Karthik Nair",
    email: "karthik.nair@email.com",
    phone: "+919876543218",
    address: {
      street: "19 Marine Drive",
      city: "Kochi",
      zip: "682001"
    }
  },
  {
    id: 10,
    name: "Ananya Das",
    email: "ananya.das@email.com",
    phone: "+919876543219",
    address: {
      street: "45 Salt Lake",
      city: "Kolkata",
      zip: "700064"
    }
  },
  {
    id: 11,
    name: "Raj Malhotra",
    email: "raj.malhotra@email.com",
    phone: "+919876543220",
    address: {
      street: "77 Bandra West",
      city: "Mumbai",
      zip: "400050"
    }
  },
  {
    id: 12,
    name: "Ayesha Syed",
    email: "ayesha.syed@email.com",
    phone: "+919876543221",
    address: {
      street: "91 Koramangala",
      city: "Bangalore",
      zip: "560034"
    }
  },
  {
    id: 13,
    name: "Dhruv Patel",
    email: "dhruv.patel@email.com",
    phone: "+919876543222",
    address: {
      street: "28 CG Road",
      city: "Ahmedabad",
      zip: "380009"
    }
  },
  {
    id: 14,
    name: "Kavya Menon",
    email: "kavya.menon@email.com",
    phone: "+919876543223",
    address: {
      street: "63 MG Road",
      city: "Kochi",
      zip: "682011"
    }
  },
  {
    id: 15,
    name: "Nikhil Sharma",
    email: "nikhil.sharma@email.com",
    phone: "+919876543224",
    address: {
      street: "14 Malviya Nagar",
      city: "Jaipur",
      zip: "302017"
    }
  },
  {
    id: 16,
    name: "Riya Kapoor",
    email: "riya.kapoor@email.com",
    phone: "+919876543225",
    address: {
      street: "52 Defence Colony",
      city: "Delhi",
      zip: "110024"
    }
  },
  {
    id: 17,
    name: "Arun Krishnan",
    email: "arun.krishnan@email.com",
    phone: "+919876543226",
    address: {
      street: "37 T Nagar",
      city: "Chennai",
      zip: "600017"
    }
  },
  {
    id: 18,
    name: "Neha Gupta",
    email: "neha.gupta@email.com",
    phone: "+919876543227",
    address: {
      street: "83 Aundh",
      city: "Pune",
      zip: "411007"
    }
  },
  {
    id: 19,
    name: "Siddharth Roy",
    email: "siddharth.roy@email.com",
    phone: "+919876543228",
    address: {
      street: "95 Banjara Hills",
      city: "Hyderabad",
      zip: "500034"
    }
  },
  {
    id: 20,
    name: "Tanvi Desai",
    email: "tanvi.desai@email.com",
    phone: "+919876543229",
    address: {
      street: "22 Navrangpura",
      city: "Ahmedabad",
      zip: "380009"
    }
  },
  {
    id: 21,
    name: "Rohan Mehta",
    email: "rohan.mehta@email.com",
    phone: "+919876543230",
    address: {
      street: "68 Powai",
      city: "Mumbai",
      zip: "400076"
    }
  },
  {
    id: 22,
    name: "Anjali Singh",
    email: "anjali.singh@email.com",
    phone: "+919876543231",
    address: {
      street: "31 HSR Layout",
      city: "Bangalore",
      zip: "560102"
    }
  },
  {
    id: 23,
    name: "Varun Joshi",
    email: "varun.joshi@email.com",
    phone: "+919876543232",
    address: {
      street: "44 Model Town",
      city: "Delhi",
      zip: "110009"
    }
  },
  {
    id: 24,
    name: "Divya Prakash",
    email: "divya.prakash@email.com",
    phone: "+919876543233",
    address: {
      street: "73 Adyar",
      city: "Chennai",
      zip: "600020"
    }
  },
  {
    id: 25,
    name: "Kunal Bajaj",
    email: "kunal.bajaj@email.com",
    phone: "+919876543234",
    address: {
      street: "59 Viman Nagar",
      city: "Pune",
      zip: "411014"
    }
  },
  {
    id: 26,
    name: "Maya Pillai",
    email: "maya.pillai@email.com",
    phone: "+919876543235",
    address: {
      street: "16 Panampilly Nagar",
      city: "Kochi",
      zip: "682036"
    }
  },
  {
    id: 27,
    name: "Aryan Khanna",
    email: "aryan.khanna@email.com",
    phone: "+919876543236",
    address: {
      street: "84 Andheri West",
      city: "Mumbai",
      zip: "400053"
    }
  },
  {
    id: 28,
    name: "Ishita Banerjee",
    email: "ishita.banerjee@email.com",
    phone: "+919876543237",
    address: {
      street: "27 New Alipore",
      city: "Kolkata",
      zip: "700053"
    }
  },
  {
    id: 29,
    name: "Sahil Shetty",
    email: "sahil.shetty@email.com",
    phone: "+919876543238",
    address: {
      street: "92 Indiranagar",
      city: "Bangalore",
      zip: "560038"
    }
  },
  {
    id: 30,
    name: "Pooja Mehta",
    email: "pooja.mehta@email.com",
    phone: "+919876543239",
    address: {
      street: "48 Paldi",
      city: "Ahmedabad",
      zip: "380007"
    }
  }
];

function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('91') ? `+${digits}` : `+91${digits}`;
}

export async function GET() {
  try {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json(sortedUsers);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const input: UserCreateInput = await request.json();

    if (!input.name || !input.email || !input.phone || !input.address.city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhone(input.phone);
    if (!/^\+91\d{10}$/.test(formattedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: Date.now(),
      name: capitalizeFirst(input.name),
      email: input.email,
      phone: formattedPhone,
      address: {
        city: capitalizeFirst(input.address.city),
        street: input.address.street,
        zip: input.address.zip
      }
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const initialLength = users.length;
    users = users.filter(user => user.id !== id);

    if (users.length === initialLength) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: message.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='message.proto',
  package='miscdata',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=b'\n\rmessage.proto\x12\x08miscdata\"9\n\x0bSaveRequest\x12\x0c\n\x04uuid\x18\x01 \x01(\t\x12\x0f\n\x07user_id\x18\x02 \x01(\x05\x12\x0b\n\x03\x64oc\x18\x03 \x01(\t\"\x15\n\x05Reply\x12\x0c\n\x04\x64\x61ta\x18\x01 \x01(\t2;\n\x07Message\x12\x30\n\x04Save\x12\x15.miscdata.SaveRequest\x1a\x0f.miscdata.Reply\"\x00\x62\x06proto3'
)




_SAVEREQUEST = _descriptor.Descriptor(
  name='SaveRequest',
  full_name='miscdata.SaveRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='uuid', full_name='miscdata.SaveRequest.uuid', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='user_id', full_name='miscdata.SaveRequest.user_id', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='doc', full_name='miscdata.SaveRequest.doc', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=27,
  serialized_end=84,
)


_REPLY = _descriptor.Descriptor(
  name='Reply',
  full_name='miscdata.Reply',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='data', full_name='miscdata.Reply.data', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=86,
  serialized_end=107,
)

DESCRIPTOR.message_types_by_name['SaveRequest'] = _SAVEREQUEST
DESCRIPTOR.message_types_by_name['Reply'] = _REPLY
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

SaveRequest = _reflection.GeneratedProtocolMessageType('SaveRequest', (_message.Message,), {
  'DESCRIPTOR' : _SAVEREQUEST,
  '__module__' : 'message_pb2'
  # @@protoc_insertion_point(class_scope:miscdata.SaveRequest)
  })
_sym_db.RegisterMessage(SaveRequest)

Reply = _reflection.GeneratedProtocolMessageType('Reply', (_message.Message,), {
  'DESCRIPTOR' : _REPLY,
  '__module__' : 'message_pb2'
  # @@protoc_insertion_point(class_scope:miscdata.Reply)
  })
_sym_db.RegisterMessage(Reply)



_MESSAGE = _descriptor.ServiceDescriptor(
  name='Message',
  full_name='miscdata.Message',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=109,
  serialized_end=168,
  methods=[
  _descriptor.MethodDescriptor(
    name='Save',
    full_name='miscdata.Message.Save',
    index=0,
    containing_service=None,
    input_type=_SAVEREQUEST,
    output_type=_REPLY,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_MESSAGE)

DESCRIPTOR.services_by_name['Message'] = _MESSAGE

# @@protoc_insertion_point(module_scope)

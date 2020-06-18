# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: archive.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='archive.proto',
  package='biz',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=b'\n\rarchive.proto\x12\x03\x62iz\"S\n\x0bSaveRequest\x12\x0c\n\x04uuid\x18\x01 \x01(\t\x12\n\n\x02sn\x18\x02 \x01(\t\x12\x0f\n\x07id_card\x18\x03 \x01(\t\x12\x0c\n\x04name\x18\x04 \x01(\t\x12\x0b\n\x03\x64oc\x18\x05 \x01(\t\"\x15\n\x05Reply\x12\x0c\n\x04\x64\x61ta\x18\x01 \x01(\t21\n\x07\x41rchive\x12&\n\x04Save\x12\x10.biz.SaveRequest\x1a\n.biz.Reply\"\x00\x62\x06proto3'
)




_SAVEREQUEST = _descriptor.Descriptor(
  name='SaveRequest',
  full_name='biz.SaveRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='uuid', full_name='biz.SaveRequest.uuid', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='sn', full_name='biz.SaveRequest.sn', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='id_card', full_name='biz.SaveRequest.id_card', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='name', full_name='biz.SaveRequest.name', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='doc', full_name='biz.SaveRequest.doc', index=4,
      number=5, type=9, cpp_type=9, label=1,
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
  serialized_start=22,
  serialized_end=105,
)


_REPLY = _descriptor.Descriptor(
  name='Reply',
  full_name='biz.Reply',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='data', full_name='biz.Reply.data', index=0,
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
  serialized_start=107,
  serialized_end=128,
)

DESCRIPTOR.message_types_by_name['SaveRequest'] = _SAVEREQUEST
DESCRIPTOR.message_types_by_name['Reply'] = _REPLY
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

SaveRequest = _reflection.GeneratedProtocolMessageType('SaveRequest', (_message.Message,), {
  'DESCRIPTOR' : _SAVEREQUEST,
  '__module__' : 'archive_pb2'
  # @@protoc_insertion_point(class_scope:biz.SaveRequest)
  })
_sym_db.RegisterMessage(SaveRequest)

Reply = _reflection.GeneratedProtocolMessageType('Reply', (_message.Message,), {
  'DESCRIPTOR' : _REPLY,
  '__module__' : 'archive_pb2'
  # @@protoc_insertion_point(class_scope:biz.Reply)
  })
_sym_db.RegisterMessage(Reply)



_ARCHIVE = _descriptor.ServiceDescriptor(
  name='Archive',
  full_name='biz.Archive',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=130,
  serialized_end=179,
  methods=[
  _descriptor.MethodDescriptor(
    name='Save',
    full_name='biz.Archive.Save',
    index=0,
    containing_service=None,
    input_type=_SAVEREQUEST,
    output_type=_REPLY,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_ARCHIVE)

DESCRIPTOR.services_by_name['Archive'] = _ARCHIVE

# @@protoc_insertion_point(module_scope)

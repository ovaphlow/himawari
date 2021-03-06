# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: file.proto

from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='file.proto',
  package='utility',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=b'\n\nfile.proto\x12\x07utility\"%\n\x10ParseXlsxRequest\x12\x11\n\tfile_name\x18\x01 \x01(\t\"\x15\n\x05Reply\x12\x0c\n\x04\x64\x61ta\x18\x01 \x01(\t2@\n\x04\x46ile\x12\x38\n\tParseXlsx\x12\x19.utility.ParseXlsxRequest\x1a\x0e.utility.Reply\"\x00\x62\x06proto3'
)




_PARSEXLSXREQUEST = _descriptor.Descriptor(
  name='ParseXlsxRequest',
  full_name='utility.ParseXlsxRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='file_name', full_name='utility.ParseXlsxRequest.file_name', index=0,
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
  serialized_start=23,
  serialized_end=60,
)


_REPLY = _descriptor.Descriptor(
  name='Reply',
  full_name='utility.Reply',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='data', full_name='utility.Reply.data', index=0,
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
  serialized_start=62,
  serialized_end=83,
)

DESCRIPTOR.message_types_by_name['ParseXlsxRequest'] = _PARSEXLSXREQUEST
DESCRIPTOR.message_types_by_name['Reply'] = _REPLY
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

ParseXlsxRequest = _reflection.GeneratedProtocolMessageType('ParseXlsxRequest', (_message.Message,), {
  'DESCRIPTOR' : _PARSEXLSXREQUEST,
  '__module__' : 'file_pb2'
  # @@protoc_insertion_point(class_scope:utility.ParseXlsxRequest)
  })
_sym_db.RegisterMessage(ParseXlsxRequest)

Reply = _reflection.GeneratedProtocolMessageType('Reply', (_message.Message,), {
  'DESCRIPTOR' : _REPLY,
  '__module__' : 'file_pb2'
  # @@protoc_insertion_point(class_scope:utility.Reply)
  })
_sym_db.RegisterMessage(Reply)



_FILE = _descriptor.ServiceDescriptor(
  name='File',
  full_name='utility.File',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=85,
  serialized_end=149,
  methods=[
  _descriptor.MethodDescriptor(
    name='ParseXlsx',
    full_name='utility.File.ParseXlsx',
    index=0,
    containing_service=None,
    input_type=_PARSEXLSXREQUEST,
    output_type=_REPLY,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_FILE)

DESCRIPTOR.services_by_name['File'] = _FILE

# @@protoc_insertion_point(module_scope)
